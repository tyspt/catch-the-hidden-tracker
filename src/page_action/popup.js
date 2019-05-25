chrome.runtime.getBackgroundPage((window) => {
    var appMap = window.getTrackers();

    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs) {
        let baseUrl = tabs[0].url.split("://")[1];
        let badUrlMap = appMap.get(baseUrl);

        if (badUrlMap) {
            badUrlMap.forEach(function(value, key, map) {
                // console.log(value, key);
                $("#threats-content").append('<ul id="threats-content" class="list-group"><li class="list-group-item"><div class="float-left">' + key + '</div><div class="float-right">' + value + '</div></li></ul>');



            })
        }
    });
})