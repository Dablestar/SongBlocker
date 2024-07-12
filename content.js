var filePath = "./banList.txt";
var currentBackground = getCurrentBackgroundURL();
var skipBtn = getSkipButton();

console.log(currentBackground);
console.log(skipBtn);
function isBackgroundInList(filePath, URL){
    var isInsideList = fetch(filePath)
    .then(result => result.text())
    .then(text => {lines = text.split('\r\n'); return lines})
    .then(list => {
        var result = false;
        for(var i=0; i<list.length; i++){
            if(list[i] == URL){
                result = true;
                return;
            }
        }
        return result;
    });
    return isInsideList;
}

function addBackgroundOnBanList(){

}

function getCurrentBackgroundURL(){
    let URL = document.querySelector("#icon-container > #thumbnail-container").getAttribute("href");
    return URL;
}

function getSkipButton(){
    let button = document.querySelector('#navigation-button-down');
    return button; 
}


isBackgroundInList(filePath, currentBackground).then((result) => {
    if(result == true){
        pressSkipBtn(currentTab);
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'clickButton') {
      if (skipBtn) {
        skipBtn.click();
        console.log('Webpage button was clicked!');
      } else {
        console.log('Webpage button not found');
      }
    }
  });