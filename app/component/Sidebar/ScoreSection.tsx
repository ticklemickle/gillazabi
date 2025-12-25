import { Chip } from "./Function";

type Props = {
  label: string;
  score: number;
  chips?: string[];
};

export default function ScoreSection({ label, score, chips }: Props) {
  return (
    <section className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">{label}</span>
      </div>

      <div className="text-5xl font-extrabold">
        {score}
        <span className="ml-1 text-2xl">점</span>
      </div>

      {!!chips?.length && (
        <div className="flex flex-wrap gap-2 pt-1">
          {chips.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
      )}
    </section>
  );
}
