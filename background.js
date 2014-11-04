// Message handler
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.type){
    case 'icon':
      var icon;
      if(request.iconEnabled === true){
        icon = chrome.extension.getURL('/img/icon_38.png');
      } else {
        icon = chrome.extension.getURL('/img/icon_38_disabled.png');
      }

      // Set the extension icon
      chrome.browserAction.setIcon({
          path: icon
      });
      break;

    case 'badge':
      var badgeCount = request.count || 0;
      chrome.browserAction.getBadgeText({tabId: sender.tab.id}, function (count){
        // Parse actual count and add new blocked count
        count = parseInt(count || 0) + badgeCount;

        // Sete the badge count number
        chrome.browserAction.setBadgeText({text: count.toString(), tabId: sender.tab.id});
      });
      break;

    default:
      console.log("Unknown request:", request);
  }
});