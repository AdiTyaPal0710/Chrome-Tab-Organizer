
document.getElementById("organizeTabs").addEventListener("click", function () {

  //To query and get information about all the open tabs in browser
  chrome.tabs.query({}, function (tabs) {

    //Help us organize the tabs
    const tabMap = {};

    // Goes through each tab,we got from chrome.tabs.query
    tabs.forEach(function (tab) {

      // gets url from each tab and extract the hostname 
      const hostname = new URL(tab.url).hostname;

      //checks if we have a group for this website in tabMap
      if (tabMap[hostname]) {
        //if we already have a group for this website,we push the current tab to that group
        tabMap[hostname].push(tab.id);
      } else {
        //else we create a new group and add current tab to that group
        tabMap[hostname] = [tab.id];
      }
    });
  
    for (const hostname in tabMap) {
      //For each group of tabs,we create a new tab group in chrome browser
      chrome.tabs.group({ tabIds: tabMap[hostname] }, function (groupId) {

        //We give name to the group based on the website
        chrome.tabGroups.update(groupId, { title: hostname });
      });
    }
  });
});


document.getElementById("assignColors").addEventListener("click", function () {


  chrome.tabs.query({}, function (tabs) {

    tabs.forEach(function (tab) {

      // Generate a random color in hexadecimal format.
      const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

      // Assign the color to the tab.
      chrome.tabs.update(tab.id, { highlighted: true });

      //We're telling the Chrome browser to run a small piece of code on the webpage associated with the current tab.
      chrome.scripting.executeScript({

        //Speicfy which tab we want to run the code
        target: { tabId: tab.id },

        //We provide a function that sets the background color of the web page to the color that we generated earlier. This code changes the background color of the webpage.
        function: (color) => {
          document.body.style.backgroundColor = color;
        },

        //we pass randomColor we generated as an argument to the function we are running on 
        args: [randomColor],
      });
    });
  });
});
