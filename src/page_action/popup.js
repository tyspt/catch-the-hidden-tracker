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
                        $("#threats-content").append('<li class="list-group-item list-group-item-danger"><div class="float-left"><img src="../../icons/_ionicons_svg_md-remove-circle-outline.svg" class="block-icon-danger" id="' + key + '"><span>' + key + '</span></div><div class="float-right">' + category + '</div></li>');
                        break;
                    default:
                        $("#threats-content").append('<li class="list-group-item list-group-item-warning"><div class="float-left"><img src="../../icons/_ionicons_svg_md-remove-circle-outline.svg" class="block-icon-warning" id="' + key + '"><span>' + key + '</span></div><div class="float-right">' + category + '</div></li>');
                        break;
                }
            })
        }


        $(document).on('click', '.block-icon-warning', function(event) {
            const icon = event.target;

            const listItem = $(icon).parent().parent();

            $(listItem).toggleClass("list-group-item-secondary");
            $(listItem).toggleClass("list-group-item-warning");
        })

        $(document).on('click', '.block-icon-danger', function(event) {
            const icon = event.target;
            console.log(icon.id);

            const listItem = $(icon).parent().parent();

            $(listItem).toggleClass("list-group-item-secondary");
            $(listItem).toggleClass("list-group-item-danger");
        })
    });
})