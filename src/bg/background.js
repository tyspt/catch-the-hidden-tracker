chrome.webRequest.onBeforeRequest.addListener(function(details) {


    console.log("requestURL --> " + details.url);

    let url = details.url;
    let baseUrl = window.location.href;


    console.log("siteUrl: -> " + baseUrl);




    return { cancel: false };
}, { urls: ["<all_urls>"] }, ["blocking"]);


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.pageAction.show(sender.tab.id);
        sendResponse();
    });