chrome.runtime.getBackgroundPage((window) => {
    var appMap = window.getTrackers();

    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs) {
        let baseUrl = tabs[0].url.split("://")[1];
        let badUrlMap = appMap.get(baseUrl);

        $('<div id="total" class="text-right">Trackers found: ' + badUrlMap.size + '</div>').insertAfter("#title");

        // insert each url to the list in popup window
        if (badUrlMap) {
            badUrlMap.forEach(function(category, key, map) {
                switch (category) {
                    case 'Mouse':
                    case 'Analytics':
                        $("#threats-content").append('<li class="list-group-item list-group-item-danger"><div class="float-left">' + key + '</div><div class="float-right">' + category + '</div></li>');
                        break;
                    default:
                        $("#threats-content").append('<li class="list-group-item list-group-item-warning"><div class="float-left">' + key + '</div><div class="float-right">' + category + '</div></li>');
                        break;
                }
            })
        }
    });
})


document.addEventListener('DOMContentLoaded', function() {
    $(".block-icon").on('click', function(event) {
        const element = event.target;
        console.log(element.id);


        $(element).toggleClass("list-group-item-secondary").toggleClass("list-group-item-danger");
    });
});