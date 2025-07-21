import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "내집길라잡이",
  description: "나에게 딱 맞는 부동산 정책",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-white">{children}</body>
    </html>
  );
}
