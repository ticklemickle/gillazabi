import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "길라잡이 - 우리 동네 예비타당성조사 가능성을 한 눈에",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
