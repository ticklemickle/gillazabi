import NaverMap from "../maps/NaverMap";

type Props = {
  onSelectRouteId: (routeId: string) => void;
};

export default function MapView({ onSelectRouteId }: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <NaverMap onSelectRouteId={onSelectRouteId} />
    </div>
  );
}
