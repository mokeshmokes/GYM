'use client';

const SECRET =
  process.env.NEXT_PUBLIC_API_ENCRYPTION_SECRET ||
  'vst_fitness_aes256_gcm_vault_key_2026_super_secure';

function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const len = binary.length;
  const buffer = new ArrayBuffer(len);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

let cachedKey: CryptoKey | null = null;

async function getCryptoKey(): Promise<CryptoKey> {
  if (cachedKey) return cachedKey;
  const hashKey = await globalThis.crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(SECRET)
  );
  cachedKey = await globalThis.crypto.subtle.importKey(
    'raw',
    hashKey,
    { name: 'AES-GCM' },
    false,
    ['decrypt', 'encrypt']
  );
  return cachedKey;
}

export interface EncryptedClientEnvelope {
  encrypted: true;
  data: string;
}

/**
 * Encrypt client request body before sending to the server.
 * Network tab will only display the encrypted payload string, hiding all personal details.
 */
export async function clientEncrypt<T = any>(data: T): Promise<EncryptedClientEnvelope> {
  try {
    const key = await getCryptoKey();
    const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
    const plaintext = typeof data === 'string' ? data : JSON.stringify(data);
    const encoded = new TextEncoder().encode(plaintext);

    const encryptedBuf = await globalThis.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv as BufferSource },
      key,
      encoded as BufferSource
    );

    const ivB64 = uint8ArrayToBase64(iv);
    const cipherB64 = uint8ArrayToBase64(new Uint8Array(encryptedBuf));

    return {
      encrypted: true,
      data: `${ivB64}:${cipherB64}`,
    };
  } catch (err) {
    console.error('Client encryption failed:', err);
    throw err;
  }
}

/**
 * Decrypt server response envelope or return as-is if unencrypted.
 */
export async function clientDecrypt<T = any>(responseJson: any): Promise<T> {
  if (!responseJson || typeof responseJson !== 'object') {
    return responseJson as T;
  }

  if (responseJson.encrypted !== true || typeof responseJson.data !== 'string') {
    return responseJson as T;
  }

  try {
    const [ivB64, cipherB64] = responseJson.data.split(':');
    if (!ivB64 || !cipherB64) {
      throw new Error('Malformed encrypted response format');
    }

    const key = await getCryptoKey();
    const iv = base64ToUint8Array(ivB64);
    const cipherBytes = base64ToUint8Array(cipherB64);

    const decryptedBuf = await globalThis.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv as BufferSource },
      key,
      cipherBytes as BufferSource
    );

    const decryptedStr = new TextDecoder().decode(decryptedBuf);
    return JSON.parse(decryptedStr) as T;
  } catch (err) {
    console.warn('Client decryption error, returning raw response:', err);
    return responseJson as T;
  }
}
