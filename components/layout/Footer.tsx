import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const kategorier = [
  { label: "Vinduer", href: "/produkter/vindu" },
  { label: "Innerdører", href: "/produkter/innerdor" },
  { label: "Ytterdører", href: "/produkter/ytterdor" },
  { label: "Balkong & Skyvedør", href: "/produkter/balkongdor" },
];

const info = [
  { label: "Om oss", href: "/om-oss" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Bestill på mål", href: "/produkter" },
  { label: "Montering", href: "/om-oss#montering" },
];

export function Footer() {
  return (
    <footer className="bg-[#0E0F12] text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/logo.png"
              alt="Vinduskongen AS"
              width={160}
              height={52}
              className="h-14 lg:h-[200px] w-auto object-contain brightness-0 invert mb-6"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              VINDUSKONGEN AS leverer billigst og best kvalitet på dører og
              vinduer. PVC med 3-lags glass og 25 år garanti.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#B08A55]/20 border border-[#B08A55]/30 rounded-full px-4 py-2">
              <span className="text-[#B08A55] text-xs font-semibold">
                25 ÅRS GARANTI
              </span>
            </div>
          </div>

          {/* Kategorier */}
          <div>
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
              Kategorier
            </h3>
            <ul className="space-y-3">
              {kategorier.map((k) => (
                <li key={k.href}>
                  <Link
                    href={k.href}
                    className="text-white/70 hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    {k.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasjon */}
          <div>
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
              Informasjon
            </h3>
            <ul className="space-y-3">
              {info.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="text-white/70 hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">
              Kontakt
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Phone size={14} className="text-[#B08A55] flex-shrink-0" />
                <span>+47 22 33 44 55</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Mail size={14} className="text-[#B08A55] flex-shrink-0" />
                <span>post@vinduskongen.no</span>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin
                  size={14}
                  className="text-[#B08A55] flex-shrink-0 mt-0.5"
                />
                <span>Norsk produksjon · Leveres hjem til deg</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/50 mb-1">
                Samarbeidspartner for montering:
              </p>
              <p className="text-sm text-white font-medium">
                Østlandske Byggpartner AS
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © 2026 Vinduskongen AS. Alle rettigheter forbeholdt.
          </p>
          <p className="text-white/40 text-xs">Org.nr: 123 456 789 MVA</p>
        </div>
      </div>
    </footer>
  );
}
