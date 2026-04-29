"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  category: {
    label: string;
    href: string;
    sub: string[];
  };
  onClose: () => void;
}

export function MegaMenu({ category, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.16)] border border-[#E7E3DA] overflow-hidden"
    >
      <div className="p-2">
        {category.sub.map((sub) => (
          <Link
            key={sub}
            href={`${category.href}?type=${sub.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-[#0E0F12] hover:bg-[#F6F4EF] transition-colors cursor-pointer group"
          >
            <span className="flex-1">{sub}</span>
            <ArrowRight
              size={14}
              className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150 text-[#B08A55]"
            />
          </Link>
        ))}
      </div>
      <div className="border-t border-[#E7E3DA] p-3">
        <Link
          href={category.href}
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0E0F12] text-white text-sm font-medium hover:bg-[#1F2A37] transition-colors cursor-pointer"
        >
          Se alle {category.label.toLowerCase()}
          <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}
