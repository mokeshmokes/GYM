import crypto from 'crypto';

const SECRET =
  process.env.API_ENCRYPTION_SECRET ||
  process.env.NEXT_PUBLIC_API_ENCRYPTION_SECRET ||
  'vst_fitness_aes256_gcm_vault_key_2026_super_secure';

const ALGORITHM = 'aes-256-gcm';

export interface EncryptedResponseEnvelope {
  encrypted: true;
  data: string;
}

/**
 * Encrypt server response using AES-256-GCM.
 * DevTools Network tab will only see an opaque encrypted envelope.
 */
export function encryptServerResponse<T = any>(data: T): EncryptedResponseEnvelope {
  try {
    const keyBytes = crypto.createHash('sha256').update(SECRET).digest();
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITHM, keyBytes, iv);

    const plaintext = typeof data === 'string' ? data : JSON.stringify(data);
    const enc1 = cipher.update(plaintext, 'utf8');
    const enc2 = cipher.final();
    const tag = cipher.getAuthTag();
    const combined = Buffer.concat([enc1, enc2, tag]);

    return {
      encrypted: true,
      data: `${iv.toString('base64')}:${combined.toString('base64')}`,
    };
  } catch (err) {
    console.error('Server encryption error:', err);
    throw err;
  }
}

/**
 * Decrypt incoming request payload if encrypted by the client,
 * or gracefully return as-is if plain JSON was provided.
 */
export function decryptServerRequest<T = any>(body: any): T {
  if (!body || typeof body !== 'object') return body;
  if (body.encrypted !== true || typeof body.data !== 'string') {
    return body as T;
  }

  try {
    const [ivB64, cipherB64] = body.data.split(':');
    if (!ivB64 || !cipherB64) {
      throw new Error('Malformed encrypted payload format');
    }

    const keyBytes = crypto.createHash('sha256').update(SECRET).digest();
    const ivBuf = Buffer.from(ivB64, 'base64');
    const cipherBuf = Buffer.from(cipherB64, 'base64');

    if (cipherBuf.length < 16) {
      throw new Error('Encrypted payload too short');
    }

    const ciphertext = cipherBuf.subarray(0, cipherBuf.length - 16);
    const tag = cipherBuf.subarray(cipherBuf.length - 16);

    const decipher = crypto.createDecipheriv(ALGORITHM, keyBytes, ivBuf);
    decipher.setAuthTag(tag);
    let dec = decipher.update(ciphertext, undefined, 'utf8');
    dec += decipher.final('utf8');

    return JSON.parse(dec) as T;
  } catch (err) {
    console.error('Server decryption error:', err);
    throw new Error('Failed to decrypt request payload');
  }
}
