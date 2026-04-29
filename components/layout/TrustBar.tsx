import { Shield, Truck, Wrench, BadgeCheck } from "lucide-react";

const items = [
  { icon: BadgeCheck, text: "Billigst på markedet — alltid" },
  { icon: Shield, text: "25 års garanti" },
  { icon: Truck, text: "Fri frakt over 5 000 kr" },
  { icon: Wrench, text: "Montering via Østlandske Byggpartner AS" },
];

export function TrustBar() {
  return (
    <div className="bg-[#0E0F12] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center flex-wrap gap-6 lg:gap-12 py-3">
          {items.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm">
              <Icon size={15} className="text-[#B08A55] flex-shrink-0" />
              <span className="text-white/90 whitespace-nowrap">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
