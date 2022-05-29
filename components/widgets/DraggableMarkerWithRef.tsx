//https://github.com/SkullCutter02/leaflet-polyline-from-markers/blob/main/components/MarkerWithRef.tsx

import React, { Dispatch, SetStateAction, useRef } from "react";
import { Marker } from "react-leaflet";
import L, { LatLng } from "leaflet";

import markerIcon from "../../config/markerIcon";

interface Props {
  markerCoordinate: LatLng;
  onChange: (...event: any[]) => void;
}

const DraggableMarkerWithRef: React.FC<Props> = ({
  markerCoordinate,
  onChange,
}) => {
  const markerRef = useRef<L.Marker>(null);

  const eventHandlers = () => ({
    dragend() {
      onChange(markerRef.current.getLatLng());
    },
  });

  return (
    <>
      <Marker
        ref={markerRef}
        draggable
        eventHandlers={eventHandlers()}
        icon={markerIcon}
        position={markerCoordinate}
      />
    </>
  );
};

export default DraggableMarkerWithRef;
