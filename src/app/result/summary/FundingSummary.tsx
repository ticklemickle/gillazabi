"use client";

interface Props {
  price: string;
}

export default function FundingSummary({ price }: Props) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold border-b pb-1 mb-3">
        💰 자금 시나리오
      </h2>
      <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-2 leading-relaxed">
        <div className="flex justify-between">
          <span>예상 매매가</span>
          <span className="font-medium text-gray-800">{price || "7억 원"}</span>
        </div>
        <div className="flex justify-between">
          <span>예상 대출 가능 금액 (LTV 70%)</span>
          <span className="font-medium text-gray-800">4.9억 원</span>
        </div>
        <div className="flex justify-between">
          <span>DSR 고려시 한도</span>
          <span className="font-medium text-gray-800">4.5억 원</span>
        </div>
        <hr />
        <div className="flex justify-between">
          <span>취득세 (1.1%)</span>
          <span>770만 원</span>
        </div>
        <div className="flex justify-between">
          <span>중개 수수료 (~0.4%)</span>
          <span>280만 원</span>
        </div>
        <div className="flex justify-between">
          <span>이사비, 등기 등 기타</span>
          <span>200만 원</span>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-base mt-2">
          <span>총 필요 현금</span>
          <span className="text-red-600">2.77억 원</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        ※ 계산 기준: 무주택자, 수도권, 실거주 조건 / 단순 예시이며 실제는 다를
        수 있음
      </p>
    </section>
  );
}
