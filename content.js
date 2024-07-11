let skipBtn = document.querySelector("#navigation-button-down");
let currentTab = getCurrentTab();

async function getCurrentTab(){
    let queryOptions = { active : true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

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

function getCurrentBackground(currentTab){
    let backgroundURL = currentTab.then((response) => {
        let background = chrome.scripting.executeScript({
            target : {tabId : response.id},
            func : getCurrentBackgroundURL,
        })
        return background;
    }).then((res) => {
        return res[0].result;
    });
    return backgroundURL;
}
function getCurrentBackgroundURL(){
    let URL = document.querySelector("#thumbnail-container").getAttribute("href");
    return URL;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("listen");
    if (request.action === 'clickButton') {
      if (skipBtn) {
        skipBtn.click();
        console.log('Webpage button was clicked!');
      } else {
        console.log('Webpage button not found');
      }
    }
});
