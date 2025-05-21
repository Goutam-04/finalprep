"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, ListChecks, Filter } from "lucide-react";

const cards = [
  {
    title: "Search Companies",
    icon: <Search className="w-8 h-8 text-yellow-400" />,
    desc: "Find your dream company instantly.",
  },
  {
    title: "Explore Questions",
    icon: <ListChecks className="w-8 h-8 text-yellow-400" />,
    desc: "Instant access to most asked questions.",
  },
  {
    title: "Apply Filters",
    icon: <Filter className="w-8 h-8 text-yellow-400" />,
    desc: "Search across 100+ companies with ease.",
  },
];

export default function Sections() {
  return (
    <section className="bg-[#101820] text-[#E0E0E0] px-4 md:px-6 py-20 space-y-32 overflow-hidden">

      {/* How It Works */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">How It Works</h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-[#17232e] text-left hover:shadow-xl transition duration-300 h-full rounded-xl hover:border-[#FEE715]">
                <CardHeader className="flex flex-col items-center space-y-4 pt-6">
                  {card.icon}
                  <CardTitle className="text-xl font-semibold text-white text-center">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-[#CCCCCC] text-sm  pb-6 text-center">
                  {card.desc}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* About */}
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">About This Project</h2>
        <p className="text-[#CCCCCC] text-base md:text-lg mb-4">
          Built using open-source LeetCode data to help students and professionals prepare more effectively.
        </p>
        <p className="text-[#AAAAAA] text-sm md:text-base">
          Created by <span className="font-semibold text-white">Goutam</span> &nbsp;|&nbsp;
          <a href="https://github.com/Goutam-04" className="text-[#FEE715]  hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a> &nbsp;|&nbsp;
          <a href="https://x.com/Goutam_004" className="text-[#FEE715] hover:underline" target="_blank" rel="noopener noreferrer">X </a> &nbsp;|&nbsp;
          <a href="https://www.linkedin.com/in/goutam-kumar-nayak" className="text-[#FEE715] hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>
      </motion.div>

    </section>
  );
}
