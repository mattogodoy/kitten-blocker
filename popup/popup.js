var init = function(){
  var checkBox = document.getElementById('hideCatsToggle');

  // Set the checkbox to the extension state
  chrome.storage.sync.get('status', function(data) {
    checkBox.checked = data.status;
  });

  checkBox.addEventListener('click', function(event){
    var status = this.checked;

    // Save extension enabled state
    chrome.storage.sync.set({'status': status}, function() {
      if(status === true){
        // If extension was enabled, send message to the contentscript to run
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {command: 'run'}, function(response) {});
        });

      }

      // Change the icon to enabled / disabled
      chrome.runtime.sendMessage({type: 'icon', iconEnabled: status}, function(response) {});
    });
  });
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
  init();
});