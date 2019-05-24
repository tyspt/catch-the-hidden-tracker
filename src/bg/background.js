var thirdParty = ['test'];

chrome.webRequest.onBeforeRequest.addListener(function(details) {


    console.log("requestURL --> " + details.url);

    let url = details.url;
    let baseUrl = window.location.href;


    console.log("siteUrl: -> " + baseUrl);




    return { cancel: false };
}, { urls: ["<all_urls>"] }, ["blocking"]);

function getThridParty(){
    return thirdParty;
}