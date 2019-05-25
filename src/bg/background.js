var thirdParty = ['test'];

var blacklist = new Map();
var appMap; // contains the bad Urls maps for each site
var urlEachSite = new Map(); //contains bad url for one specific site

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs) {
        // console.log(tabs[0]);

        let baseUrl = tabs[0].url.split("://")[1];

        urlEachSite = appMap.get(baseUrl);
        if (!urlEachSite) {
            urlEachSite = new Map();
            appMap.set(baseUrl, urlEachSite);
        }

        if (baseUrl.includes("/")) {
            baseUrl = baseUrl.split("/")[0];
        }


        let url = details.url.split("://")[1];
        if (url.includes("/")) {
            url = url.split("/")[0];
        }

        url = extractDomain(url);

        console.log("requested url: " + url);

        if (!urlEachSite.get(url)) {
            if (blacklist.get(url)) {
                console.log("======================== blacklist ======================: " + url);
                urlEachSite.set(url, 'category'); //TODO: set category
            } else {
                if (!url.includes(baseUrl)) {
                    // console.log(url);
                }
            }
        }

        // console.log(urlEachSite);
    });
    return { cancel: false };
}, { urls: ["<all_urls>"] }, ["blocking"]);


(function setup() {
    appMap = new Map();
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
                let urlToSave = extractDomain(split[i].split("0.0.0.0 ")[1].split(" ")[0].trim());

                blacklist.set(urlToSave, true);
            }
        }
    })

})();

//loads the app filter list data 
chrome.runtime.onInstalled.addListener(function() {

});

function getTrackers() {
    return appMap;
}

function getThridParty() {
    return thirdParty;
}


function extractDomain(url) {
    if (url.split(".").length > 2) {
        var domain = url.split(".");
        if (domain[domain.length - 2].length > 2) {
            url = domain[domain.length - 2] + "." + domain[domain.length - 1];
        }
    };
    return url;
}