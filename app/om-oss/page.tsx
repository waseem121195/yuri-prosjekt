import { Shield, Award, Hammer, Phone } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Les om Vinduskongen AS og vår samarbeidspartner Østlandske Byggpartner AS for montering av vinduer og dører.",
};

export default function OmOssPage() {
  return (
    <div className="min-h-screen bg-[#F6F4EF] pt-header">
      {/* Hero */}
      <div className="bg-[#0E0F12] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#B08A55] text-sm font-semibold uppercase tracking-widest mb-3">
            Om oss
          </p>
          <h1
            className="text-white text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            VINDUSKONGEN AS
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Vi skal alltid levere billigst og ikke minst best kvalitet på dører og vinduer.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission */}
        <div className="bg-white rounded-2xl p-8 border border-[#E7E3DA] mb-8">
          <h2
            className="text-2xl font-bold text-[#0E0F12] mb-4"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Vår misjon
          </h2>
          <p className="text-[#0E0F12]/70 leading-relaxed mb-4">
            VINDUSKONGEN AS produserer og selger alle typer vinduer og dører med 3-lags glass og
            vedlikeholdsfritt PVC som materiale med 25 år garanti.
          </p>
          <p className="text-[#0E0F12]/70 leading-relaxed">
            Vi tror på at alle norske hjem fortjener energieffektive, vakre og holdbare vinduer og
            dører — uten å betale overpris. Derfor jobber vi hardt for å holde kostnadene nede uten
            å gå på kompromiss med kvaliteten.
          </p>
        </div>

        {/* USPs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {[
            {
              icon: Award,
              title: "25 års garanti",
              text: "Vi er så trygge på produktene våre at vi gir 25 år full garanti.",
            },
            {
              icon: Shield,
              title: "3-lags glass",
              text: "Blant de beste energiverdiene på markedet for norsk klima.",
            },
            {
              icon: Hammer,
              title: "Norsk produksjon",
              text: "Produsert for nordiske krav til kulde, fukt og temperatursvingninger.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-[#E7E3DA] rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#B08A55]/15 flex items-center justify-center mx-auto mb-3">
                <Icon size={22} className="text-[#B08A55]" />
              </div>
              <h3 className="font-bold text-[#0E0F12] mb-2">{title}</h3>
              <p className="text-sm text-[#0E0F12]/65 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Partner section */}
        <div id="montering" className="bg-[#0E0F12] rounded-2xl p-8 text-white mb-8">
          <h2
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Montering av dør og vindu
          </h2>
          <p className="text-white/70 leading-relaxed mb-6">
            Vi kan sette inn din nye dør eller vindu — vi bruker vår samarbeidspartner{" "}
            <span className="font-semibold text-white">Østlandske Byggpartner AS</span> for faglig
            montering. Erfarne håndverkere sikrer at installasjonen er tett, rett og etter alle
            gjeldende byggeforskrifter.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B08A55] text-white font-semibold rounded-xl hover:bg-[#9A7645] transition-colors cursor-pointer text-sm"
          >
            <Phone size={14} />
            Be om tilbud på montering
          </Link>
        </div>
      </div>
    </div>
  );
}
