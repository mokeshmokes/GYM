# Google Sheets Lead Storage Integration Guide
## VST FITNESS WORLD — Automated Lead Capture

This guide explains how your website automatically stores every lead directly into a **Google Spreadsheet (Google Sheets)** in real-time.

---

## ⚡ Quick 2-Minute Setup

### Step 1: Create a New Google Sheet
1. Go to [Google Sheets](https://sheets.google.com/) and create a **Blank spreadsheet**.
2. Rename it to: **`VST Fitness World Leads`**.
3. In **Row 1**, set up the following column headers:
   * **A1:** `Timestamp`
   * **B1:** `Full Name`
   * **C1:** `Phone Number`
   * **D1:** `Email Address`
   * **E1:** `Interested Plan`
   * **F1:** `Message / Goals`
   * **G1:** `Source`
   * **H1:** `Status`

---

### Step 2: Open Google Apps Script
1. In your Google Sheet, click **Extensions** in the top menu.
2. Select **Apps Script**.
3. Delete any default code inside `Code.gs` and paste the following script:

```javascript
/**
 * VST FITNESS WORLD - Lead Capture Webhook
 * Automatically appends website inquiries into Google Sheet.
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming data (handles FormData, URLSearchParams, or JSON)
    var data = {};
    if (e.postData && e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    var timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    var name = data.name || "N/A";
    var phone = data.phone || "N/A";
    var email = data.email || "N/A";
    var plan = data.plan || "N/A";
    var message = data.message || "N/A";
    var source = data.source || "Website Inquiry";
    var status = "New Lead";

    // Append new row
    sheet.appendRow([timestamp, name, phone, email, plan, message, source, status]);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Lead recorded successfully",
      timestamp: timestamp
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// For GET requests / health-check
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "VST Fitness World Leads Webhook is Live!"
  })).setMimeType(ContentService.MimeType.JSON);
}
```

---

### Step 3: Deploy as a Web App
1. At the top right of the Apps Script window, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon (**Select type**) next to "Select type" and choose **Web app**.
3. Fill in the deployment settings:
   * **Description:** `VST Fitness World Lead Hook`
   * **Execute as:** `Me (your email)`
   * **Who has access:** **`Anyone`** *(CRITICAL: Must be "Anyone" so website visitors can submit without Google login)*.
4. Click **Deploy**.
5. Grant permissions if prompted (Click *Review Permissions* > Select your Google Account > Click *Advanced* > Click *Go to VST Fitness (unsafe)* > Click *Allow*).
6. Copy the **Web App URL** provided (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).

---

### Step 4: Paste URL into `index.html`
1. Open [`c:\GYM\index.html`](file:///c:/GYM/index.html).
2. Locate line ~4300 in the JavaScript section:
   ```javascript
   const GOOGLE_SHEET_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE";
   ```
3. Replace `"YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE"` with your copied Web App URL:
   ```javascript
   const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbz_YOUR_REAL_ID_HERE/exec";
   ```
4. Save the file. That's it! Every submission now lands in your Google Sheet within seconds.

---

## 🔒 Built-in Local Lead Vault (Zero Lead Loss)
Even before you paste your Google Apps Script URL or when testing offline:
1. Every lead is automatically saved in browser **`localStorage`**.
2. You can click **"View Stored Leads (Admin Vault)"** right under the contact form or in the footer to inspect all leads.
3. You can click **"Export to CSV / Excel"** to download all leads as a `.csv` file anytime!
