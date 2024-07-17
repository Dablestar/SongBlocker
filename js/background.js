var filePath = "./banList.txt";
var currentBackground;

async function getCurrentTab(){
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
}

function getBanList(){
    // var isInsideList = fetch(filePath)
    // .then(result => result.text())
    // .then(text => {
    //     var lines = text.split('\r\n'); 
    //     return lines
    // });
    // return isInsideList;
    var data = chrome.storage.local.get('banList', function(data) {
        console.log("get data: " + data.banList);
    });
    // .then(result => result.text())
    // .then(text => {
    //     var lines = text.split('\r\n');
    //     return lines;
    // });
    // return banList;
    var banListText = JSON.parse(data);
    console.log(banListText);
    return banListText;
}

function isBackgroundInList(URL){
    console.log(URL);
    var result = false;
    var banList = getBanList();
    for(var i=0; i<banList.length; i++){
        console.log("banList" + i + " : " + banList[i]);
        if(banList[i] == URL){
            console.log("Skip()");
            sendSkipMsg();
            result = true;
        }
    }
    if(!result){
        console.log("no Skip");
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
                currentBackground = response;
                console.log("getURL message sent");
                console.log(response);
                isBackgroundInList(currentBackground);
            }
        });
    }
  });

  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({banList : ""}, function(){
        console.log("Added Successfully");
    })
  })