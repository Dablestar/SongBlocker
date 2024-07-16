var filePath = "./banList.txt";
var backgroundURL;

async function getCurrentTab(){
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
}

function addBackgroundOnBanList(URL){

}


document.getElementById("addBtn").addEventListener("click", function(){
    getCurrentTab().then(response => {
        console.log(response)
        chrome.tabs.sendMessage(response, {action : "getURL"}, (url) => {
            backgroundURL = url;
            console.log(url);
        });
    })
    // chrome.runtime.sendMessage({action:"requestURL"}, function(response){
    //     console.log(response);
    //     backgroundURL = response;
    //     console.log(backgroundURL);
    // });
});

