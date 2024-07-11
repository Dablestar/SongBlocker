var testBtn = document.querySelector('#test'); 

testBtn.addEventListener("click", function(){
    currentTab.then((response) => {
        chrome.tabs.sendMessage(response.id, {action : "clickBtn"});
    })
});
