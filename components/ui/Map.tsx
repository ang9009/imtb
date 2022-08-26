import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import L from "leaflet";
import osmProviders from "../../config/osm-providers";
import useGeoLocation from "../../hooks/useGeoLocation";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import getAllToilets from "../../queries/getAllToilets";
import markerIcon from "../../config/markerIcon";
import findDistanceBetweenCoords from "../../utils/findDistanceBetweenCoords";
import PrimaryButton from "../widgets/PrimaryButton";

const Map = ({ lat, lng }) => {
  const toiletCoordsObject = {
    lat: lat,
    lng: lng,
  };

  const currLocation = useGeoLocation();
  const router = useRouter();
  const [nearbyToilets, setNearbyToilets] = useState([]);
  const [nearestToilet, setNearestToilet] = useState<String | null>();
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    if (currLocation.loaded && currLocation.error) {
      router.back();
    }
  }, [currLocation]);

  const {
    data: { data: toilets },
  } = useQuery("toilets", () => getAllToilets());

  const findNearestToilet = () => {
    const toiletsDistance: { [key: string]: number } = {};

    toilets.forEach((toilet) => {
      toiletsDistance[toilet.id] = findDistanceBetweenCoords(
        currLocation.coordinates.lat,
        currLocation.coordinates.lng,
        toilet.lat,
        toilet.lng
      );
    });

    const nearbyToiletIds = Object.keys(toiletsDistance).filter(
      (toiletId) => toiletsDistance[toiletId] <= 0.5
    );

    nearbyToiletIds.forEach((toiletId) => {
      nearbyToilets.push(toilets.find((toilet) => toilet.id == toiletId));
    });

    const nearestToiletId = Object.keys(toiletsDistance).reduce((a, b) =>
      toiletsDistance[a] > toiletsDistance[b] ? b : a
    );

    const nearestToilet = toilets.find(
      (toilet) => toilet.id === nearestToiletId
    );

    setNearestToilet(nearestToilet.name);

    mapRef.current.flyTo(
      { lat: nearestToilet.lat, lng: nearestToilet.lng },
      18
    );
  };

  return (
    <>
      <div>
        {currLocation.loaded && (
          <MapContainer
            ref={mapRef}
            zoom={30}
            center={
              toiletCoordsObject.lat
                ? toiletCoordsObject
                : currLocation.coordinates
            }
          >
            <TileLayer
              url={osmProviders.maptiler.url}
              attribution={osmProviders.maptiler.attribution}
            />

            {toilets.map((toilet) => (
              <Marker
                key={toilet.id}
                icon={markerIcon}
                position={{ lat: toilet.lat, lng: toilet.lng }}
                eventHandlers={{
                  click: () => {
                    router.push(`/toilets/${toilet.id}`);
                  },
                }}
              >
                <Tooltip
                  direction="bottom"
                  offset={[0, 0]}
                  opacity={1}
                  permanent
                >
                  {toilet.name}
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        )}

        <PrimaryButton
          onClick={findNearestToilet}
          text={"Find nearest toilet"}
          margin={"20px auto"}
        />
        <p>
          {nearbyToilets.length === 0 ? (
            `Could not find nearby toilets within walking distance. Nearest toilet: ${nearestToilet}`
          ) : (
            <p>
              Nearby toilets within walking distance:
              {nearbyToilets.map((toilet) => {
                return <p>{toilet.name}</p>;
              })}
            </p>
          )}
        </p>
      </div>

      <style jsx>{`
        div {
          width: 100vw;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

export default Map;
