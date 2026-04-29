"use client";
import { useState } from "react";
import { Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function KontaktPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock send — just show success
    setSent(true);
  }

  const field =
    "px-4 py-3 border border-[#E7E3DA] rounded-xl text-sm bg-white focus:outline-none focus:border-[#B08A55] focus:ring-2 focus:ring-[#B08A55]/15 transition-all w-full";
  const labelCls =
    "block text-xs font-semibold text-[#0E0F12]/60 uppercase tracking-wide mb-1.5";

  return (
    <div className="min-h-screen bg-[#F6F4EF] pt-header">
      <div className="bg-[#0E0F12] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#B08A55] text-sm font-semibold uppercase tracking-widest mb-3">
            Ta kontakt
          </p>
          <h1
            className="text-white text-4xl font-bold"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Kontakt oss
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {[
              {
                icon: Phone,
                title: "Telefon",
                value: "+47 22 33 44 55",
                sub: "Mandag–fredag 08–16",
              },
              {
                icon: Mail,
                title: "E-post",
                value: "post@vinduskongen.no",
                sub: "Svar innen 1 virkedag",
              },
              {
                icon: Clock,
                title: "Åpningstider",
                value: "Man–fre 08:00–16:00",
                sub: "Lørdag etter avtale",
              },
            ].map(({ icon: Icon, title, value, sub }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-5 border border-[#E7E3DA] flex gap-4 items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-[#B08A55]/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-[#B08A55]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#0E0F12]/50 uppercase tracking-wide mb-0.5">
                    {title}
                  </p>
                  <p className="font-semibold text-[#0E0F12]">{value}</p>
                  <p className="text-xs text-[#0E0F12]/40 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-white rounded-2xl p-8 border border-[#E7E3DA] text-center">
                <CheckCircle2 size={40} className="text-[#B08A55] mx-auto mb-4" />
                <h2
                  className="text-xl font-bold text-[#0E0F12] mb-2"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Melding sendt!
                </h2>
                <p className="text-[#0E0F12]/60">
                  Vi tar kontakt innen 1 virkedag. Takk for henvendelsen.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-6 border border-[#E7E3DA] space-y-5"
              >
                <h2
                  className="font-bold text-[#0E0F12] text-lg mb-2"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Send oss en melding
                </h2>
                <div>
                  <label className={labelCls}>Navn *</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={field}
                    placeholder="Ditt navn"
                  />
                </div>
                <div>
                  <label className={labelCls}>E-post *</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={field}
                    placeholder="din@epost.no"
                  />
                </div>
                <div>
                  <label className={labelCls}>Melding *</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${field} resize-none`}
                    rows={5}
                    placeholder="Fortell oss hva du trenger hjelp med..."
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-[#B08A55] text-white font-semibold rounded-xl hover:bg-[#9A7645] transition-colors cursor-pointer"
                >
                  <Send size={15} />
                  Send melding
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
