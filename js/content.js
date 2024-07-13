var skipBtn = getSkipButton();



function getCurrentBackgroundURL(){
    let URL = document.querySelector("#icon-container > #thumbnail-container").getAttribute("href");
    return URL;
}

function getSkipButton(){
    let button = document.querySelector('#navigation-button-down > ytd-button-renderer');
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