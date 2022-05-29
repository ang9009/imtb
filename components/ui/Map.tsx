import React, { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import osmProviders from "../../config/osm-providers";
import useGeoLocation from "../../hooks/useGeoLocation";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

const Map = () => {
  const center = useGeoLocation();

  const router = useRouter();

  useEffect(() => {
    if (center.loaded && center.error) {
      router.back();
    }
  }, [center]);

  return (
    <>
      <div>
        {center.loaded && (
          <MapContainer zoom={30} center={center.coordinates}>
            <TileLayer
              url={osmProviders.maptiler.url}
              attribution={osmProviders.maptiler.attribution}
            />
          </MapContainer>
        )}
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
