import React, { useEffect, useRef, useState } from "react";

const GoogleMap = ({ onMarkerClick }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [useIframe, setUseIframe] = useState(false);

  const TARGET_COORDINATES = { lat: 37.82930364268072, lng: 30.52358382493422 };

  const GOOGLE_MAPS_API_KEY = "AIzaSyCt9TvcAPhAtSc-RgR38y_eLwU6ndmwM3A";

  useEffect(() => {

    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "YOUR_ACTUAL_API_KEY_HERE") {
      setUseIframe(true);
      return;
    }

    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      if (document.getElementById('google-maps-script')) {
        return;
      }

      window.initGoogleMap = initializeMap;

      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initGoogleMap`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        console.error("Google Maps API yüklenemedi. Iframe'e geçiliyor.");
        setUseIframe(true);
      };
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: TARGET_COORDINATES,
        zoom: 15,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }]
          }
        ]
      });

      const marker = new window.google.maps.Marker({
        position: TARGET_COORDINATES,
        map: map,
        title: "Seçilen Konum",
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          scaledSize: new window.google.maps.Size(32, 32)
        },
        animation: window.google.maps.Animation.DROP
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 5px 0; color: #333;">Seçilen Konum</h3>
            <p style="margin: 0; color: #666;">
              Koordinat: ${TARGET_COORDINATES.lat.toFixed(6)}, ${TARGET_COORDINATES.lng.toFixed(6)}
            </p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        if (typeof onMarkerClick === 'function') {
          onMarkerClick();
        }
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;

      map.addListener('click', (event) => {
        
        marker.setPosition(TARGET_COORDINATES);
        

        map.panTo(TARGET_COORDINATES);
      });

      
      map.addListener('dragend', () => {
        
        if (marker.getPosition() && 
            (marker.getPosition().lat() !== TARGET_COORDINATES.lat || 
             marker.getPosition().lng() !== TARGET_COORDINATES.lng)) {
          marker.setPosition(TARGET_COORDINATES);
        }
      });


      map.addListener('zoom_changed', () => {
        if (marker.getPosition() && 
            (marker.getPosition().lat() !== TARGET_COORDINATES.lat || 
             marker.getPosition().lng() !== TARGET_COORDINATES.lng)) {
          marker.setPosition(TARGET_COORDINATES);
        }
      });
    };

    loadGoogleMapsScript();

   
    return () => {
      const script = document.getElementById('google-maps-script');
      if (script) {
        script.remove();
      }
    };
  }, []);

 
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      markerRef.current.setPosition(TARGET_COORDINATES);
      mapInstanceRef.current.panTo(TARGET_COORDINATES);
    }
  });

  return (
    <section id="google-map-section" style={{ marginTop: "20px" }}>
      {useIframe ? (
        
        <iframe
          title="ParkaEase Google Harita"
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.2568054748797!2d${TARGET_COORDINATES.lng-0.01}!3d${TARGET_COORDINATES.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMzfCsDQ5JzQ1LjUiTiAzMMKwMzEnMjQuOSJF!5e0!3m2!1str!2str!4v1582561234567!5m2!1str!2str&markers=color:red%7C${TARGET_COORDINATES.lat},${TARGET_COORDINATES.lng}`}
          width="100%"
          height="627"
          style={{ border: 0, borderRadius: "10px" }}
          allowFullScreen=""
          loading="lazy"
        />
      ) : (
        
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "700px",
            borderRadius: "10px",
            border: "2px solid #AEDFF7"
          }}
        />
      )}
    </section>
  );
};

export default GoogleMap;