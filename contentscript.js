// Find cats in strings
var matchString = function(string) {
  if (!string) {
    return false;
  }

  var kWords = [
    "gato",
    "gatito",
    "cat",
    "kitty",
    "kitten"
  ];
  var re = new RegExp(kWords.join('|'), "gi");

  if (string.search(re) < 0) {
    return false;
  } else {
    return true;
  }
};

// Search cats in pictures
var replaceCats = function(){
  var replacedKitties = 0;
  var height;
  var width;

  $("img").each(function(index, image){
    // Check if the source was already replaced
    if(!image.src.match('rick-astley.jpg')){
      if (matchString(image.src) || matchString(image.alt) || matchString(image.title)) {
        // Save the size for later
        height = image.height;
        width = image.width;

        // Replace that kitty! Random number to prevent caching
        image.src = chrome.extension.getURL('/img/rick-astley.jpg' + '?' + Math.random(5));

        // Restore original size
        image.height = height;
        image.width = width;

        // Count kitties
        replacedKitties++;
      }
    }
  });

  // Set the extension badge to replaced kitties count
  chrome.runtime.sendMessage({type: 'badge', count: replacedKitties}, function(response) {});
};

// Waits for a message from the popup to run
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(request.command === 'run'){
    replaceCats();
  }

  // Send empty response to clean connection
  sendResponse({});
});

// DOM Mutation Observer to detect page changes
var observer = new WebKitMutationObserver(function (mutations) {
  // If the extension is enabled, run
  chrome.storage.sync.get('status', function(data) {
    if(data && data.status){
      replaceCats();
    } else {
      // Change the icon to disabled
      chrome.runtime.sendMessage({type: 'icon', iconEnabled: false}, function(response) {});
    }
  });
});

// Observe DOM changes
observer.observe(document.body, {childList : true, subtree : true});