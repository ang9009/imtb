import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng } from "leaflet";

import osmProviders from "../../config/osm-providers";
import useGeoLocation from "../../hooks/useGeoLocation";
import MarkerWithRef from "../widgets/MarkerWithRef";
import MapProps from "../../types/MapProps.interface";

const defaultCenter = {
  lat: 22.427509,
  lng: 114.205905,
};

const Map: React.FC<MapProps> = ({ onChange, value }) => {
  const center = useGeoLocation();

  const [markerCoordinates, setMarkerCoordinates] = useState<LatLng>(null);

  useEffect(() => {
    if (center?.coordinates) {
      onChange(center?.coordinates);
    }
  }, [center]);

  return (
    <>
      <div>
        {center.loaded && (
          <MapContainer
            zoom={30}
            center={center.error ? defaultCenter : center.coordinates}
          >
            <TileLayer
              url={osmProviders.maptiler.url}
              attribution={osmProviders.maptiler.attribution}
            />
            <MarkerWithRef markerCoordinate={value} onChange={onChange} />
          </MapContainer>
        )}
      </div>

      <style jsx>{`
        div {
          width: 100%;
          height: 600px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

export default Map;
