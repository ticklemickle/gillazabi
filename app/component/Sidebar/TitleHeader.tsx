import ShareButton from "@/app/function/ShareButton";

type Props = {
  title: string;
  subtitle?: string;
  expectedCompletion?: string;
};

export default function TitleHeader({
  title,
  subtitle,
  expectedCompletion,
}: Props) {
  return (
    <header>
      <div className="flex justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-2">
            <h1 className="text-3xl font-extrabold">{title}</h1>
            {subtitle && (
              <span className="text-lg text-neutral-500">{subtitle}</span>
            )}
          </div>
          {expectedCompletion && (
            <p className="mt-2 text-neutral-700">{expectedCompletion}</p>
          )}
        </div>
        <ShareButton />
      </div>
    </header>
  );
}
