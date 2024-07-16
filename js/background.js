var filePath = "./banList.txt";
var currentBackground;

async function getCurrentTab(){
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
}

function getBanList(){
    var isInsideList = fetch(filePath)
    .then(result => result.text())
    .then(text => {
        var lines = text.split('\r\n'); 
        return lines
    });
    return isInsideList;
}

function isBackgroundInList(URL){
    var result = false;
    var banList = getBanList();
    for(var i=0; i<banList.length; i++){
        if(banList[i] == URL){
            sendSkipMsg();
            result = true;
        }
    }
    if(!result){
        console.log("link does not included in the document");
    }
}

function sendSkipMsg(){
    getCurrentTab().then(response => {
        chrome.tabs.sendMessage(response, {action : "skip"});
    });
}

// chrome.scripting
//   .registerContentScripts([{
//     id: "session-script",
//     js: ["content.js"],
//     persistAcrossSessions: false,
//     matches: ["*://youtube.com/*"],
//     runAt: "document_end",
//   }])
//   .then(() => console.log("registration complete"))
//   .catch((err) => console.warn("unexpected error", err));

// console.log("test");


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.scripting.executeScript({
        target: {tabId : tab.id},
        files: ["./js/content.js"]
    })
    if (changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, { action: "getURL" }, (response) => {
            if (response) {
                console.log("getURL message sent");
                console.log(response);
                isBackgroundInList(response);
            }
        });
    }
  });