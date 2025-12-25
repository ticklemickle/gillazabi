import Image from "next/image";

export default function LogoSection() {
  return (
    <div className="flex items-center justify-center px-5 py-4 border-b border-neutral-100">
      <Image
        src="/image/logo/gillazabi_logo_red.png"
        alt="길라잡이 로고"
        width={180}
        height={60}
        className="h-8 w-auto"
      />
    </div>
  );
}
