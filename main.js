prism.mapDrifter = function (widget) {

    // Save the map object as it's loaded
    widget.on("beforeviewloaded", function (widget, args) {

        // Set a max zoom size
        var maxZoomLevel = 5;

        // Save the map object
        var map = args.options.map;

        var updateMap = function (map, bounds, maxLevel) {

            // Apply the calculated bounds to the map
            map.fitBounds(
                bounds,
                {
                    maxZoom: maxLevel
                }
            );
        };

        // remove all markers expect the first one
        for (var i = 1; i < args.options.markersArray.length; i++) {
            map.removeLayer(args.options.markersArray[i]);
        }

        i = 1;
        // add 1 marker at a time and remove the previous one
        var interval = setInterval(function () {

            if (i === args.options.markersArray.length) {
                clearInterval(interval);
            }

            var prev = args.options.markersArray[i - 1];
            var next = args.options.markersArray[i];

            map.removeLayer(prev);
            map.addLayer(next);
            i++;
            /*
            // trying to trigger mouseover - not working
            //next.fireEvent("mouseover");
            var ev = new MouseEvent("mouseover",{clientX:next._point.x, clientY:next._point.y})
            next._leaflet_events.mouseover[0].action(ev);
            */

            // var ev = {
            //     originalEvent:{clientX:next._point.x, clientY:next._point.y},
            //     target: next
            // };
            // next._leaflet_events.mouseover[0].action(ev);

            // set zoom
            var marker = L.marker([next._latlng.lat, next._latlng.lng]);
            var featureGroup = L.featureGroup([marker]);

            // Get the outer bounds of that feature group
            var rawBounds = featureGroup.getBounds();
            var bounds = [[rawBounds._southWest.lat, rawBounds._southWest.lng], [rawBounds._northEast.lat, rawBounds._northEast.lng]];


            //set zoom level
            updateMap(map, bounds, maxZoomLevel)

        }, 3000 + (Math.floor(Math.random() * 3000)));

    });
};