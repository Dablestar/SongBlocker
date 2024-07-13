var filePath = "./banList.txt";
var currentBackground = getCurrentBackgroundURL();

async function getCurrentTab(){
    let queryOptions = { active : true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
}

function isBackgroundInList(filePath, URL){
    var isInsideList = fetch(filePath)
    .then(result => result.text())
    .then(text => {lines = text.split('\r\n'); return lines})
    .then(list => {
        var result = false;
        for(var i=0; i<list.length; i++){
            if(list[i] == URL){
                skip();
                break;
            }
        }
        return result;
    });
    return isInsideList;
}

function skip(){
    getCurrentTab().then(response => {
        console.log(response);
        chrome.scripting.executeScript({
            target : {tabId : response},
            files : ['content.js']
        }, () => {
            chrome.tabs.sendMessage(response, {action : "clickButton"});
            console.log("message sent");
    });
    });
}


isBackgroundInList(filePath, currentBackground);
