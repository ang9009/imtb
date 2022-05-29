import React, { useEffect, useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import osmProviders from "../../config/osm-providers";
import useGeoLocation from "../../hooks/useGeoLocation";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import getAllToilets from "../../queries/getAllToilets";
import markerIcon from "../../config/markerIcon";
import findDistanceBetweenCoords from "../../utils/findDistanceBetweenCoords";

const Map = () => {
  const center = useGeoLocation();
  const router = useRouter();

  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    if (center.loaded && center.error) {
      router.back();
    }
  }, [center]);

  const {
    data: { data: toilets },
  } = useQuery("toilets", () => getAllToilets());

  const findNearestToilet = () => {
    const toiletsDistance: { [key: string]: number } = {};

    toilets.forEach((toilet) => {
      toiletsDistance[toilet.id] = findDistanceBetweenCoords(
        center.coordinates.lat,
        center.coordinates.lng,
        toilet.lat,
        toilet.lng
      );
    });

    const nearestToiletId = Object.keys(toiletsDistance).reduce((a, b) =>
      toiletsDistance[a] > toiletsDistance[b] ? b : a
    );

    const nearestToilet = toilets.find(
      (toilet) => toilet.id === nearestToiletId
    );

    mapRef.current.flyTo(
      { lat: nearestToilet.lat, lng: nearestToilet.lng },
      18
    );
  };

  return (
    <>
      <div>
        {center.loaded && (
          <MapContainer ref={mapRef} zoom={30} center={center.coordinates}>
            <TileLayer
              url={osmProviders.maptiler.url}
              attribution={osmProviders.maptiler.attribution}
            />

            {toilets.map((toilet) => (
              <Marker
                key={toilet.id}
                icon={markerIcon}
                position={{ lat: toilet.lat, lng: toilet.lng }}
              />
            ))}
          </MapContainer>
        )}

        <button onClick={findNearestToilet}>Find Nearest Toilet</button>
      </div>

      <style jsx>{`
        div {
          width: 100vw;
          height: 100vh;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

export default Map;
