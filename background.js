//used to keep track on the grounp of tabs oragnized by wbesite
const tabGroups = {};


chrome.tabs.onCreated.addListener(function (tab) {
  // Extract the hostname (website) from the URL.
  const hostname = new URL(tab.url).hostname;

  // Check if a group with this hostname already exists.
  if (tabGroups[hostname]) {
    // Add the new tab to the existing group.
    tabGroups[hostname].push(tab.id);
  } 
  else {
    // Create a new group for the website and add the tab to it.
    chrome.tabs.group({ tabIds: [tab.id] }, function (groupId) {
      // Assign the hostname as the group title.
      chrome.tabGroups.update(groupId, { title: hostname });
      tabGroups[hostname] = [tab.id];
    });
  }
});


