var filePath = "./banList.txt";
var currentBackground = getCurrentBackground(currentTab);

isBackgroundInList(filePath, currentBackground).then((result) => {
    if(result == true){
        pressSkipBtn(currentTab);
    }
});

