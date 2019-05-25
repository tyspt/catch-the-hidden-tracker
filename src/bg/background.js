var thirdParty = ['test'];
var blacklist = [];

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs) {
        // console.log(tabs[0]);

        let baseUrl = tabs[0].url;
        let url = details.url;

        //console.log("requestURL --> " + details.url);
        //console.log("siteUrl: -> " + baseUrl);








    });
    return { cancel: false };
}, { urls: ["<all_urls>"] }, ["blocking"]);


(function setup(){
    var list = "";
    var split = [];
    $.ajax({
        url: "http://winhelp2002.mvps.org/hosts.txt",
        success: function(data){
            list = data;
            //console.log(data);
        }
    })
    var c = 0;
    split = list.split(" ");
    console.log(split);
    for(var i = 0; i < split.length; i++){
        if(split[i].charAt(0) == '0'){
            console.log(split.split("0.0.0.0 ")[0]);
            blacklist[c++] = split.split("0.0.0.0 ")[0];
        }
    }
    for(var i = 0; i < 50; i++){
        console.log(blacklist[i]);
    }

})();

//loads the app filter list data 
chrome.runtime.onInstalled.addListener(function() {

});

function getThridParty() {
    return thirdParty;
}