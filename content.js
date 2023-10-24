// Extract the webpage title.
const pageTitle = document.title;

// Send the title back to the extension's background script.
chrome.runtime.sendMessage({ pageTitle });
