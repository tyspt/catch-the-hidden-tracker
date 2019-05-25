var thirdParty = ['test'];
var blacklist = new Map();

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs) {
        // console.log(tabs[0]);

        let baseUrl = tabs[0].url.split("://")[1];
        if (baseUrl.includes("/")) {
            baseUrl = baseUrl.split("/")[0];
        }

        let url = details.url.split("://")[1];
        if (url.includes("/")) {
            url = url.split("/")[0];
        }
        //console.log("requestURL --> " + details.url);
        //console.log("siteUrl: -> " + baseUrl);

        //get domain from urls



        //compare with the map

        console.log(url + ": " + blacklist.get(url));









    });
    return { cancel: false };
}, { urls: ["<all_urls>"] }, ["blocking"]);


(function setup() {
    $.ajax({
        url: "http://winhelp2002.mvps.org/hosts.txt",
        success: function(data) {
            var list = data;

            // var c = 0;
            var split = list.split("\n");
            split = split.filter(i => {
                return i.charAt(0) === '0';
            });

            for (var i = 0; i < split.length; i++) {
                blacklist.set(split[i].split("0.0.0.0 ")[1].split(" ")[0].trim(), true);
            }
        }
    })

})();

//loads the app filter list data 
chrome.runtime.onInstalled.addListener(function() {

});

function getThridParty() {
    return thirdParty;
}