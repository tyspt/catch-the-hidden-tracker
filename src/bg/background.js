var thirdParty = ['test'];

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs) {
        // console.log(tabs[0]);

        let baseUrl = tabs[0].url;
        let url = details.url;

        console.log("requestURL --> " + details.url);
        console.log("siteUrl: -> " + baseUrl);








    });
    return { cancel: false };
}, { urls: ["<all_urls>"] }, ["blocking"]);


(function setup() {
    $.ajax({
        url: "../../easylist.txt",
        success: function(data) {

        }
    });
}());

//loads the app filter list data 
chrome.runtime.onInstalled.addListener(function() {

});

function getThridParty() {
    return thirdParty;
}