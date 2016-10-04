/* global google */

function mapInit() {
    var map = new google.maps.Map( document.getElementById( 'map' ), {
        center: { lat: 54.676939, lng: 18.719794 },
        zoom: 15,
        scrollwheel: false,
        streetViewControl: false,
        styles: [
            {
                'featureType': 'administrative',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    },
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'administrative',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#000000'
                    }
                ]
            },
            {
                'featureType': 'administrative',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'administrative.country',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'administrative.locality',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'administrative.locality',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#000000'
                    }
                ]
            },
            {
                'featureType': 'administrative.neighborhood',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'landscape',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'landscape',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#000000'
                    }
                ]
            },
            {
                'featureType': 'landscape',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'landscape.man_made',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#f3f3f3'
                    }
                ]
            },
            {
                'featureType': 'landscape.man_made',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#000000'
                    }
                ]
            },
            {
                'featureType': 'landscape.man_made',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'landscape.natural.landcover',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'visibility': 'off'
                    },
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'landscape.natural.landcover',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'landscape.natural.terrain',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'landscape.natural.terrain',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#000000'
                    }
                ]
            },
            {
                'featureType': 'landscape.natural.terrain',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#000000'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#d0d0db'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#000000'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'transit',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#afafaf'
                    }
                ]
            },
            {
                'featureType': 'transit',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'transit',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#2c2776'
                    }
                ]
            },
            {
                'featureType': 'transit.station',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#000000'
                    }
                ]
            },
            {
                'featureType': 'transit.station',
                'elementType': 'labels.text.stroke',
                'stylers': [
                    {
                        'color': '#ffffff'
                    }
                ]
            },
            {
                'featureType': 'water',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#3634a3'
                    }
                ]
            }
        ]
    } );

    new google.maps.Marker( {
        position: { lat: 54.676964, lng: 18.719832 },
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Domek letniskowy w Juracie',
        icon: 'assets/dist/images/marker.png'
    } );
}

window.mapInit = mapInit;
