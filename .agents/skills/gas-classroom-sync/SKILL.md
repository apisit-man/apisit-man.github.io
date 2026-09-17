---
name: gas-classroom-sync
description: >-
  Connect web applications, quizzes, and simulations to Google Sheets via Google Apps Script (GAS).
  Use when syncing student quiz scores, logging experiment results, managing classroom sessions,
  or implementing the cross-origin PostMessage iframe bridge between GitHub Pages and Google Apps Script.
---

# Google Apps Script (GAS) Classroom Sync Architecture

This skill provides patterns for using Google Sheets as a free, serverless database for classroom quizzes, student experiment logging, and teacher dashboards.

---

## 1. The PostMessage Iframe Bridge (CORS Solution)

Modern browsers restrict direct fetch/XHR requests to `script.google.com` due to redirects and strict CORS policies. The tested solution in this repository is the **HTML PostMessage Bridge**:

```
[GitHub Pages Client (Parent)] 
        |  window.postMessage (payload, channel, requestId)
        v
[GAS Hidden IFrame (Bridge)]
        |  google.script.run.apiRequest(payload)
        v
[Google Sheets Database]
```

### Bridge HTML (`bridge.html` inside Apps Script project):
```html
<!DOCTYPE html>
<html>
<head><base target="_top"></head>
<body>
<script>
  const BRIDGE_CHANNEL = <?!= JSON.stringify(bridgeChannel) ?>;
  const ALLOWED_ORIGIN = 'https://apisit-man.github.io';

  window.addEventListener('message', (event) => {
    if (event.origin !== ALLOWED_ORIGIN && !event.origin.includes('localhost')) return;
    if (event.data?.channel !== BRIDGE_CHANNEL) return;

    const { requestId, payload } = event.data;
    google.script.run
      .withSuccessHandler((result) => {
        event.source.postMessage({ channel: BRIDGE_CHANNEL, requestId, result }, event.origin);
      })
      .withFailureHandler((err) => {
        event.source.postMessage({ channel: BRIDGE_CHANNEL, requestId, error: err.message }, event.origin);
      })
      .handleClientRequest(payload);
  });

  // Notify parent window that bridge is active
  window.top.postMessage({ type: 'bridge-ready', channel: BRIDGE_CHANNEL }, '*');
</script>
</body>
</html>
```

---

## 2. Google Apps Script Backend Handler (`Code.gs`)

```javascript
function doGet(e) {
  const template = HtmlService.createTemplateFromFile("bridge");
  template.bridgeChannel = String(e?.parameter?.channel || "default");
  return template.evaluate()
    .setTitle("Classroom Bridge")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function handleClientRequest(data) {
  const action = data.action;
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (action === "submitScore") {
    const sheet = ss.getSheetByName("Responses") || ss.insertSheet("Responses");
    sheet.appendRow([
      new Date(),
      data.testId,
      data.studentName,
      data.score,
      JSON.stringify(data.answers)
    ]);
    return { status: "success", message: "บันทึกคะแนนเรียบร้อยแล้ว" };
  }

  if (action === "getQuiz") {
    const sheet = ss.getSheetByName("Tests");
    // Read and return quiz data...
    return { status: "success", quiz: {} };
  }

  throw new Error("คำสั่งไม่ถูกต้อง: " + action);
}
```

---

## 3. Client-Side Bridge Connector with Offline Queueing

```javascript
class ClassroomSyncService {
  constructor(bridgeUrl, channel = 'classroom-sync') {
    this.bridgeUrl = bridgeUrl;
    this.channel = channel;
    this.pendingRequests = new Map();
    this.initIframe();
    this.setupOfflineSync();
  }

  initIframe() {
    this.iframe = document.createElement('iframe');
    this.iframe.src = `${this.bridgeUrl}?channel=${encodeURIComponent(this.channel)}`;
    this.iframe.style.display = 'none';
    document.body.appendChild(this.iframe);

    window.addEventListener('message', (event) => {
      const { channel, requestId, result, error } = event.data || {};
      if (channel !== this.channel) return;

      const resolver = this.pendingRequests.get(requestId);
      if (resolver) {
        this.pendingRequests.delete(requestId);
        if (error) resolver.reject(new Error(error));
        else resolver.resolve(result);
      }
    });
  }

  async send(payload) {
    // If offline, save to local queue
    if (!navigator.onLine) {
      this.enqueueOffline(payload);
      return { status: 'queued_offline', message: 'บันทึกในเครื่องแล้ว จะซิงก์เมื่อเชื่อมต่อเน็ต' };
    }

    const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    return new Promise((resolve, reject) => {
      this.pendingRequests.set(requestId, { resolve, reject });
      this.iframe.contentWindow.postMessage({ channel: this.channel, requestId, payload }, '*');

      // Timeout after 15 seconds
      setTimeout(() => {
        if (this.pendingRequests.has(requestId)) {
          this.pendingRequests.delete(requestId);
          reject(new Error('เชื่อมต่อฐานข้อมูล Google Sheets หมดเวลา'));
        }
      }, 15000);
    });
  }

  enqueueOffline(payload) {
    const queue = JSON.parse(localStorage.getItem('offline_gas_queue') || '[]');
    queue.push(payload);
    localStorage.setItem('offline_gas_queue', JSON.stringify(queue));
  }

  setupOfflineSync() {
    window.addEventListener('online', async () => {
      const queue = JSON.parse(localStorage.getItem('offline_gas_queue') || '[]');
      if (queue.length === 0) return;

      console.log(`Syncing ${queue.length} offline responses to Google Sheets...`);
      for (const item of queue) {
        try {
          await this.send(item);
        } catch (e) {
          console.warn('Sync item failed:', e);
        }
      }
      localStorage.removeItem('offline_gas_queue');
    });
  }
}
```
