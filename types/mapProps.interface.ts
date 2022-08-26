export default interface MapProps {
  onChange: (...event: any[]) => void;
  value: { lat: number; lng: number };
}
