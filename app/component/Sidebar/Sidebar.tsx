import HeroLinks from "./HeroLinks";
import TitleHeader from "./TitleHeader";
import ScoreSection from "./ScoreSection";
import ScheduleSection from "./ScheduleSection";
import DetailTable from "./DetailTable";
import ComplexList from "./ComplexList";
import { feasibilityDataMap } from "@/app/data/feasibility";
import Summary from "../Summary";

type Props = {
  selectedRouteId: string | null;
};

export default function Sidebar({ selectedRouteId }: Props) {
  const d = selectedRouteId ? feasibilityDataMap[selectedRouteId] : undefined;

  if (!d) {
    return (
      <div className="w-full max-w-md bg-white px-5 py-6 text-sm text-neutral-500">
        노선을 선택하면 보고서 요약이 표시됩니다.
      </div>
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
