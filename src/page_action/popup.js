chrome.runtime.getBackgroundPage((window) => {
    var appMap = window.getTrackers();

    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs) {
        let baseUrl = tabs[0].url.split("://")[1];
        let badUrlMap = appMap.get(baseUrl);

        if (badUrlMap) {
            badUrlMap.forEach(function(value, key, map) {
                // console.log(value, key);
                $("#threats-content").append('<div class="row">' + key + '</div>');
            })
        }
    });
})