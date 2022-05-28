import { LatLng } from "leaflet";

export default interface MapProps {
  onChange: (...event: any[]) => void;
  value: LatLng;
}
