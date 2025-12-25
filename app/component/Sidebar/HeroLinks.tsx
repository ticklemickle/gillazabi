import Image from "next/image";

type Hero = {
  url: string;
  thumbnail?: string;
  title?: string;
};

export default function HeroLinks({ heroes }: { heroes?: Hero[] }) {
  if (!heroes?.length) return null;

  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      {heroes.map((hero, i) => (
        <a
          key={i}
          href={hero.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100"
        >
          {hero.thumbnail ? (
            <Image
              src={hero.thumbnail}
              alt={hero.title || "hero thumbnail"}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">
              링크 열기
            </div>
          )}
        </a>
      ))}
    </div>
  );
}
