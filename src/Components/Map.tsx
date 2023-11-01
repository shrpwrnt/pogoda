import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { forwardRef, useEffect, useRef } from 'react';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = forwardRef(({ coord = [] }, ref) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (ref.current) return;
    ref.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [37.626615, 55.751907],
      zoom: 10,
    });
  }, [ref]);

  return <div ref={mapContainer} className="map-container" />;
});

export default Map;
