var testBtn = document.querySelector('#test'); 

async function getCurrentTab(){
    let queryOptions = { active : true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
}
function init(){
    testBtn.click();
    getCurrentTab().then(response => {
        console.log(response);
        testBtn.addEventListener("click", function(){
            chrome.scripting.executeScript({
                target : {tabId : response},
                files : ['content.js']
            }, () => {
                chrome.tabs.sendMessage(response, {action : "clickButton"});
                console.log("message sent");
            })
    });
    });
}

init();

