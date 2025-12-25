import HeroLinks from "./HeroLinks";
import TitleHeader from "./TitleHeader";
import ScoreSection from "./ScoreSection";
import ScheduleSection from "./ScheduleSection";
import DetailTable from "./DetailTable";
import ComplexList from "./ComplexList";
import { feasibilityDataMap } from "@/app/data/feasibility";
import Summary from "../Summary";
import SidebarDefault from "./SidebarDefault";

type Filters = { region: string; stage: string };

type Props = {
  selectedRouteId: string | null;
  filters: Filters;
  onChangeFilters: (next: Filters) => void;
  onSelectRouteId: (routeId: string | null) => void;
};

export default function Sidebar({
  selectedRouteId,
  filters,
  onChangeFilters,
  onSelectRouteId,
}: Props) {
  const d = selectedRouteId ? feasibilityDataMap[selectedRouteId] : undefined;

  if (!d) {
    return (
      <SidebarDefault
        filters={filters}
        onChangeFilters={onChangeFilters}
        onSelectRouteId={(id) => onSelectRouteId(id)}
      />
    );
  }

  return (
    <div className="w-full max-w-md bg-white">
      <HeroLinks heroes={d.heroLinks} />

      <div className="px-5 pb-8 space-y-6">
        <TitleHeader
          title={d.title}
          subtitle={d.subtitle}
          expectedCompletion={d.expectedCompletion}
        />

        <ScoreSection label={d.scoreLabel} score={d.score} chips={d.chips} />

        <ScheduleSection steps={d.scheduleSteps} />

        <DetailTable details={d.details} />

        <Summary feasibilityKey={selectedRouteId} />

        <ComplexList complexes={d.complexes} />
      </div>
    </div>
  );
}
