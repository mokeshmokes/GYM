# VST FITNESS WORLD — Automated Google Sheet Lead Integration Guide
### Target Spreadsheet: [VST FITNESS WORLD Google Sheet](https://docs.google.com/spreadsheets/d/1Nj1lwFkmBaIgQUjvQ6Pg8cXTH-BVxt7CM7axShckPSc/edit?usp=drivesdk)
**Spreadsheet ID:** `1Nj1lwFkmBaIgQUjvQ6Pg8cXTH-BVxt7CM7axShckPSc`

---

## 📋 Overview
Every inquiry submitted on the **VST FITNESS WORLD** website is automatically captured:
1. **Google Cloud Spreadsheet**: Sent directly to your Google Sheet in real time.
2. **Local Leads Vault**: Automatically backed up in the browser for zero lead loss.
3. **CSV Export**: You can download all leads as an Excel/CSV file anytime.

Follow the **2-minute one-time setup** below to activate direct Google Sheet writing.

---

## ⚡ 2-Minute Setup Instructions

### Step 1: Open Your Google Sheet
Open your existing Google Sheet:
👉 **[Open VST FITNESS WORLD Google Sheet](https://docs.google.com/spreadsheets/d/1Nj1lwFkmBaIgQUjvQ6Pg8cXTH-BVxt7CM7axShckPSc/edit?usp=drivesdk)**

*(If your sheet is completely blank, don't worry! The script below will automatically create the gold-styled column headers for you on the very first submission).*

---

### Step 2: Open Google Apps Script
1. In the top Google Sheet menu, click **Extensions**.
2. Click **Apps Script**.
3. A new tab will open with the script editor.
4. Delete all existing code in the code box (`Code.gs`).
5. Copy and paste the script below:

```javascript
/**
 * ============================================================================
 * VST FITNESS WORLD — Official Lead Capture Webhook
 * Spreadsheet: https://docs.google.com/spreadsheets/d/1Nj1lwFkmBaIgQUjvQ6Pg8cXTH-BVxt7CM7axShckPSc/edit
 * Spreadsheet ID: 1Nj1lwFkmBaIgQUjvQ6Pg8cXTH-BVxt7CM7axShckPSc
 * ============================================================================
 */

const SPREADSHEET_ID = "1Nj1lwFkmBaIgQUjvQ6Pg8cXTH-BVxt7CM7axShckPSc";

function doPost(e) {
  try {
    var ss;
    try {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    } catch (err) {
      ss = null;
    }
    if (!ss) {
      ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    }
    
    var sheet = ss.getActiveSheet();
    
    // Auto-create luxury gold headers in Row 1 if sheet is blank
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Phone Number",
        "Email Address",
        "Interested Plan / Program",
        "Goals / Message",
        "Lead Source",
        "Status"
      ]);
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#D4AF37");
      headerRange.setFontColor("#000000");
      sheet.setFrozenRows(1);
    }
    
    // Parse incoming lead parameters
    var data = {};
    if (e.postData && e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    var timestamp = data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var name = data.name || "N/A";
    var phone = data.phone || "N/A";
    var email = data.email || "N/A";
    var plan = data.plan || "General VIP Inquiry";
    var message = data.message || "N/A";
    var source = data.source || "VST Website Inquiry";
    var status = "New Lead";

    // Append lead as new row
    sheet.appendRow([timestamp, name, phone, email, plan, message, source, status]);

    // Return JSON success
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Lead recorded into VST FITNESS WORLD spreadsheet successfully!",
      timestamp: timestamp
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check / GET confirmation
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    spreadsheet: "VST FITNESS WORLD",
    spreadsheetId: SPREADSHEET_ID,
    message: "VST Fitness World Google Sheet webhook is live and operational!"
  })).setMimeType(ContentService.MimeType.JSON);
}
```

6. Click the **Save** floppy icon (or press `Ctrl + S`).

---

### Step 3: Deploy as Web App
1. At the top right of the Apps Script window, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to *Select type* and choose **Web app**.
3. Set the following fields:
   * **Description**: `VST Fitness World Website Webhook`
   * **Execute as**: `Me (your email)`
   * **Who has access**: **`Anyone`** *(⚠️ IMPORTANT: Must be set to "Anyone" so visitors can submit inquiries without signing in to Google)*.
4. Click **Deploy**.
5. If Google asks for permissions:
   * Click **Review Permissions**
   * Select your Google account
   * Click **Advanced** (at the bottom)
   * Click **Go to Untitled project (unsafe)** or **Go to VST Fitness Webhook (unsafe)**
   * Click **Allow**
6. Copy the **Web App URL** provided (it looks like: `https://script.google.com/macros/s/AKfycb.../exec`).

---

### Step 4: Connect the Web App URL to Your Website (2 Easy Ways)

#### Option A: Directly from the Website (No Coding Required!)
1. Open your website in the browser (`index.html`).
2. Scroll to the **Contact** section and click **"View Stored Leads Database (Admin / Demo)"**.
3. In the green Google Spreadsheet box at the top, paste your copied **Web App URL** into the input field.
4. Click **"Save Webhook"**.
5. Done! The website will now immediately stream all leads directly into your Google Sheet!

#### Option B: In `index.html` Code
1. Open `index.html`.
2. Locate line `~4508`:
   ```javascript
   const GOOGLE_SHEET_URL = ""; 
   ```
3. Paste your Web App URL between the quotes:
   ```javascript
   const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
4. Save the file.

---

## 🔒 Built-in Local Lead Vault (Zero Lead Loss)
Even before you deploy your Apps Script or when testing offline:
* Every lead is saved into the browser's local vault.
* You can click **"Export to Excel / CSV"** inside the Admin Modal to download a `.csv` file at any time.
* You can also click **"Open Google Sheet"** inside the Admin Modal to jump directly to your live spreadsheet.
