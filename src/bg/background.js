var blacklist = new Map(); //a sophiscated list which contains all current blacklisted urls from internet
var appMap; // contains the bad Urls maps for each site
var urlEachSite = new Map(); //contains bad url for one specific site

var blocklist = new Map(); //a list(acurally map) that stores which urls actually to block, as standard it's empty until user choose to block

/* initializing of app */
(function setup() {
    appMap = new Map();
    $.ajax({
        url: "http://winhelp2002.mvps.org/hosts.txt",
        success: function(data) {
            var list = data;
            var split = list.split("\n");
            split = split.filter(i => {
                return i.charAt(0) === '0';
            });
            for (var i = 0; i < split.length; i++) {
                let urlToSave = extractDomain(split[i].split("0.0.0.0 ")[1].split(" ")[0].trim().toLowerCase());
                blacklist.set(urlToSave, true);
            }
        }
    })
})();



/* fires everytime when the page sends out a new request */
chrome.webRequest.onBeforeRequest.addListener(function(details) {
    var url = details.url.toLowerCase().split("://")[1];

    if (url.includes("/")) {
        url = url.split("/")[0];
    }

    url = extractDomain(url);

    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs) {

        let baseUrl = tabs[0].url.toLowerCase().split("://")[1];

        urlEachSite = appMap.get(baseUrl);

        if (baseUrl !== "newtab/") {
            if (!urlEachSite) {
                urlEachSite = new Map();
                appMap.set(baseUrl, urlEachSite);
            }

            if (baseUrl.includes("/")) {
                baseUrl = baseUrl.split("/")[0];
            }

            var category = 'Misc'
            if (url.includes("mouse") || url.includes("click")) {
                category = 'Mouse';
            } else if (url.includes("track") || url.includes("trc")) {
                category = 'Tracker';
            } else if (url.includes("analytics")) {
                category = 'Analytics';
            } else if (url.includes("ad")) {
                category = 'Ads';
            } else if (url.includes("chat") || url.includes("facebook") || url.includes("twitter")) {
                category = 'Social Media';
            }


            if (!urlEachSite.get(url)) {
                if (blacklist.get(url)) {

                    urlEachSite.set(url, category);

                    updateAppIcon(urlEachSite);
                }
            }
        }
    });

    // console.log(url + " " + ((blocklist.get(url)) ? true : false));
    return { cancel: ((blocklist.get(url)) ? true : false) };
}, { urls: ["<all_urls>"] }, ["blocking"]);


/* update icons on tab change */
chrome.tabs.onActivated.addListener(function(activeInfo) {
    refreshIconOnTabEvenets();
});

/* update icons on page forwarding */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    refreshIconOnTabEvenets();
});

function addToBlockList(url) {
    blocklist.set(url, true);
}

function removeFromBlockList(url) {
    blocklist.delete(url);
}

function isInBlocklist(url) {
    return ((blocklist.get(url)) ? true : false);
}

function getTrackers() {
    return appMap;
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


function refreshIconOnTabEvenets() {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs) {
        const siteURl = tabs[0].url.split("://")[1]
        const urlMapOfSiteToGive = appMap.get(siteURl);

        updateAppIcon(urlMapOfSiteToGive);
    });
}


function updateAppIcon(urlMapOfSite) {
    if (!urlMapOfSite || urlMapOfSite.size < 1) {
        chrome.browserAction.setIcon({ path: "../../icons/gruen128.png" });
    } else if (urlMapOfSite.size <= 3) {
        chrome.browserAction.setIcon({ path: "../../icons/gelb128.png" });
    } else {
        chrome.browserAction.setIcon({ path: "../../icons/rot128.png" });
    }
}