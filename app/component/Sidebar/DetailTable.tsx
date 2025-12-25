import PdfDownloadButton from "@/app/function/PdfDownloadButton";

type DetailRow = {
  k: string;
  v: string;
};

type Props = {
  details?: DetailRow[];
  // 기존 코드처럼 고정 파일명을 쓰고 싶으면 기본값으로 두고,
  // 데이터에서 내려오면 교체할 수 있게 props로 열어둡니다.
  filename?: string;
};

export default function DetailTable({
  details,
  filename = "21948_2.제안공고(전문).pdf",
}: Props) {
  if (!details?.length) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">상세정보</h2>
        <PdfDownloadButton filename={filename} />
        {/* 등록된 파일이 없는 경우: PdfDownloadButton 자체에서 처리하거나, 여기서 조건 렌더링 */}
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200">
        <table className="w-full text-sm">
          <tbody>
            {details.map((row) => (
              <tr key={row.k} className="border-t first:border-t-0">
                <td className="w-28 bg-neutral-50 px-3 py-2 text-neutral-600">
                  {row.k}
                </td>
                <td className="px-3 py-2 text-neutral-900">{row.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
