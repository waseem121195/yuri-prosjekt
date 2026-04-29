import { formatNOK } from "@/lib/format";

interface Props {
  price: number;
  comparePrice?: number;
  size?: "sm" | "md" | "lg";
}

export function PriceDisplay({ price, comparePrice, size = "md" }: Props) {
  const sizeClasses = {
    sm: { price: "text-lg font-bold", compare: "text-sm", badge: "text-xs px-1.5 py-0.5" },
    md: { price: "text-2xl font-bold", compare: "text-base", badge: "text-xs px-2 py-1" },
    lg: { price: "text-3xl font-bold", compare: "text-lg", badge: "text-sm px-2.5 py-1" },
  }[size];

  const discount = comparePrice
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className={`${sizeClasses.price} text-[#0E0F12]`}>{formatNOK(price)}</span>
      {comparePrice && comparePrice > price && (
        <>
          <span className={`${sizeClasses.compare} text-[#0E0F12]/40 line-through`}>{formatNOK(comparePrice)}</span>
          <span className={`${sizeClasses.badge} bg-[#C5443B] text-white font-semibold rounded-md`}>
            -{discount}%
          </span>
        </>
      )}
    </div>
  );
}
