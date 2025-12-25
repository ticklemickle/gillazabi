import NaverMap from "../maps/NaverMap";

type Filters = { region: string; stage: string };

type Props = {
  filters: Filters;
  onSelectRouteId: (routeId: string) => void;
};

export default function MapView({ filters, onSelectRouteId }: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <NaverMap filters={filters} onSelectRouteId={onSelectRouteId} />
    </div>
  );
}
