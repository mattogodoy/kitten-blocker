// ===== FOR FUTURE FEATURES =====
function Randomize(images) {
  return Math.floor(Math.random() * images.length)
}

function imageRatio(image) {
  var proportion = image.height / image.width;

  if (proportion > 1) {
    return "vertical";
  } else if (proportion === 1) {
    return "square";
  } else if (proportion < 1) {
    return "horizontal";
  }
}
// ===============================

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

var findCats = function(image) {
  if (matchString(image.src) || matchString(image.alt) || matchString(image.title)) {
    console.log("####### Fucking cats everywhere!!");
    image.src = chrome.extension.getURL('/img/rick-astley.jpg');
  }
};

(function (document) {
  var images = document.getElementsByTagName('img');
  var length = images.length;

  for (var i = 0; i < length; i++) {
    findCats(images[i]);
  }
})(document);