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
                        $("#threats-content").append(listModel('danger', key, category));
                        break;
                    default:
                        $("#threats-content").append(listModel('warning', key, category));
                        break;
                }
            })
        }

        function listModel(bootstrapclass, key, category) {
            var blockstatus = window.isInBlocklist(key);
            return '<li class="list-group-item list-group-item-' + (blockstatus ? 'secondary' : bootstrapclass) + '" data-category="' + category + '"><div class="float-left"><img src="../../icons/_ionicons_svg_md-remove-circle-outline.svg" class="block-icon block-icon-warning" id="' + key + '"><span>' + key + '</span></div><div class="float-right">' + category + '</div></li>';
        }


        $(document).on('click', '.list-group-item', function(event) {
            const icon = event.target;
            if ($(icon).hasClass("block-icon")) {
                const listItem = $(icon).parent().parent();
                const category = listItem.attr("data-category");

                if ($(listItem).hasClass("list-group-item-secondary")) {
                    window.removeFromBlockList(icon.id);
                } else {
                    window.addToBlockList(icon.id);
                }

                $(listItem).toggleClass("list-group-item-secondary");

                switch (category) {
                    case 'Mouse':
                    case 'Analytics':
                        $(listItem).toggleClass("list-group-item-danger");
                        break;
                    default:
                        $(listItem).toggleClass("list-group-item-warning");
                        break;
                }
            }
        })
    });
})