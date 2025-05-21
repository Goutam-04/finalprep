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
    desc: "Search Across 100+ Companies",
  },
];

export default function Sections() {
  return (
    <section className="bg-[#101820] text-[#E0E0E0] px-6 py-20 space-y-20 overflow-hidden">

      {/* How It Works */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-white">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-[#1A1A1A] text-left hover:shadow-lg transition duration-300 h-full">
                <CardHeader className="flex items-center justify-center space-y-4">
                  {card.icon}
                  <CardTitle className="text-xl text-white">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-[#CCCCCC] text-sm px-6 pb-6">
                  {card.desc}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      

      {/* About */}
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
    
        <h2 className="text-3xl font-bold mb-4 text-white typewriter">About This Project</h2>
        <p className="text-[#CCCCCC] text-lg mb-4">
          Built using open-source LeetCode data to help students and professionals prepare more effectively.
        </p>
        <p className="text-[#AAAAAA]">
          Created by <span className="font-semibold">[Your Name]</span> &nbsp;|&nbsp;
          <a href="#" className="text-[#FEE715] hover:underline">GitHub ↗</a> &nbsp;|&nbsp;
          <a href="#" className="text-[#FEE715] hover:underline">LinkedIn ↗</a>
        </p>
      </motion.div>

    </section>
  );
}
