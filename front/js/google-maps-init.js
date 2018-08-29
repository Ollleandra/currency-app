(function($) {

/*
*  render_map
*
*  This function will render a Google Map onto the selected jQuery element
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	$el (jQuery element)
*  @return	n/a
*/

function render_map( $el ) {
	/*
	var head = document.getElementsByTagName('head')[0];

	// Save the original method
	var insertBefore = head.insertBefore;

	// Replace it!
	head.insertBefore = function (newElement, referenceElement) {

	    if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') > -1) {

	        console.info('Prevented Roboto from loading!');
	        return;
	    }

	    insertBefore.call(head, newElement, referenceElement);
	};
	*/

	// var
	var $markers = $el.find('.marker');

	//Styling of the maps
	var stylesArray = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#131314"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4c4c50"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4c4c50"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#232323"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4d4d4d"
      }
    ]
  }
];

	// vars
	var args = {
		zoom		: 2,
		center		: new google.maps.LatLng(0, 0),
		mapTypeId	: google.maps.MapTypeId.ROADMAP,
		styles: stylesArray,
		disableDefaultUI: false,
		scrollwheel: false,
		draggable: true,
		zoomControl: true,
		zoomControlOptions: {
        position: google.maps.ControlPosition.BOTTOM_LEFT
    },
		minZoom: 2,
	  mapTypeControl: false,
	  scaleControl: false,
	  streetViewControl: false,
	  rotateControl: false,
	  fullscreenControl: false
	};

	// create map
	var map = new google.maps.Map( $el[0], args);

	// add a markers reference
	map.markers = [];

	// add markers
	$markers.each(function(){

    	add_marker( $(this), map );

	});
	//var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'images/m'});
	// center map
	center_map( map );
	//var markerCluster = new MarkerClusterer(map, markers);


	//Prevent dragging into a grey area
	google.maps.event.addListener(map, 'bounds_changed', function(){


	    var proj =map.getProjection();
	    var bounds = map.getBounds();
	    var sLat = map.getBounds().getSouthWest().lat();
	    var nLat = map.getBounds().getNorthEast().lat();
	    if (sLat < -85 || nLat > 85) {
            // console.log('Gray area visible');
            map.setOptions({
                center: lastValidCenter
            });
        } else {
            lastValidCenter = bounds.getCenter();
        }
	});


}
/* END OF THE  render_map function */

var first_marker = true;





/*
*  add_marker
*
*  This function will add a marker to the selected Google Map
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	$marker (jQuery element)
*  @param	map (Google Map object)
*  @return	n/a
*/

function add_marker( $marker, map ) {

	// var
	var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );

	// set marker icon
	if ( ipromo_map) {
		if ( first_marker ) {
			var image = {
		    url: ipromo_map.mainpin,
		    // This marker is 24 pixels wide by 32 pixels high.
		    size: new google.maps.Size(24, 32),
		    // The origin for this image is (0, 0).
		    // origin: new google.maps.Point(0, 0),
		    // The anchor for this image is the base of the flagpole at (0, 32).
		    // anchor: new google.maps.Point(0, 32),
				labelOrigin: new google.maps.Point(12,50)
		  };
			var marker_lable = {
				text: ipromo_map.marker_lable,
				color: "white",
				fontFamily: "Raleway,sans-serif",
				fontWeight: "600",
				fontSize: "14px"
			};
			first_marker = false;
		} else {
			var image = ipromo_map.otherpin;
		}
	} else {
		var image = 'http://'+document.domain+'/wp-content/themes/ipromo/images/icon-map-big.png';
		var marker_lable = {};
	}

	// create marker
	var marker = new google.maps.Marker({
		position : latlng,
		map			 : map,
		icon     : image,
		label    : marker_lable
		// title   : "Title text",
	});

	// add to array
	// if($(window).width()>992){
		// var center = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng') - 0.015);
		//Fixed center
		// var center = new google.maps.LatLng(29.30601803, 9.49012065 - 0.015);
	// }else{
		// var center = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));
		//Fixed center
	// }
  // map.panTo(center);

	map.markers.push( marker );

	// if marker contains HTML, add it to an infoWindow
	if( $marker.html() )
	{
		// create info window
		var infowindow = new google.maps.InfoWindow({
			content		: $marker.html()
		});

		// show info window when marker is clicked
		google.maps.event.addListener(marker, 'click', function() {

			infowindow.open( map, marker );

		});
	}

}

/*
*  center_map
*
*  This function will center the map, showing all markers attached to this map
*
*  @type	function
*  @date	8/11/2013
*  @since	4.3.0
*
*  @param	map (Google Map object)
*  @return	n/a
*/

function center_map( map ) {

	// vars
	var bounds = new google.maps.LatLngBounds();


	// loop through all markers and create bounds
	$.each( map.markers, function( i, marker ){

		var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

		bounds.extend( latlng );

	});

	if ( ipromo_map && ipromo_map.center_latitude && ipromo_map.center_longitude ) {
			// set center of map
			if ($(document).width() > 768) {
					map.setCenter( new google.maps.LatLng( ipromo_map.center_latitude, ipromo_map.center_longitude ) );
					if (ipromo_map.zoom) { map.setZoom( parseInt(ipromo_map.zoom) ); } else { map.setZoom( 10 ); }
			} else {
					// console.log("Mobile map coordinates");
					map.setCenter( new google.maps.LatLng( ipromo_map.mainpin_latitude, ipromo_map.mainpin_longitude ) );
					if (ipromo_map.zoom) { map.setZoom( parseInt(ipromo_map.zoom) ); } else { map.setZoom( 10 ); }
			}
	} else if ( map.markers.length == 1 ) { // only 1 marker?
		// set center of map
	    map.setCenter( bounds.getCenter() );
	    map.setZoom( 10 );
	}
	else {
		// fit to bounds
		map.fitBounds( bounds );
	}

	// Init global variable value for "grey area" fix
    lastValidCenter = bounds.getCenter();
}



/*
*  document ready
*
*  This function will render each map when the document is ready (page has loaded)
*
*  @type	function
*  @date	8/11/2013
*  @since	5.0.0
*
*  @param	n/a
*  @return	n/a
*/

$(window).load(function(){
    // Variable for checking if the map is withing proper bounds (fix "grey area" error);
    var lastValidCenter;

	$('.acf-map').each(function(){
		render_map( $(this) );
		//setTimeout(render_map($(this)), 500);
	});
});

})(jQuery);
