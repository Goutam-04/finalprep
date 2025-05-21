"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Question {
  Title: string;
  Difficulty: string;
  Frequency: number;
  "Acceptance Rate": number;
  Topics: string;
  Link: string;
}

export default function CompanyTable({ data }: { data: Question[] }) {
  const [localCache, setLocalCache] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const cache: Record<string, boolean> = {};
    data.forEach((q) => {
      const isChecked = localStorage.getItem(q.Title);
      if (isChecked) cache[q.Title] = isChecked === "true";
    });
    setLocalCache(cache);
  }, [data]);

  const handleCheck = (title: string, checked: boolean) => {
    if (!localStorage.getItem("shownLocalWarning")) {
      alert("⚠️ This is stored in local cache. Do not clear browser storage if you want to retain progress.");
      localStorage.setItem("shownLocalWarning", "true");
    }
    localStorage.setItem(title, String(checked));
    setLocalCache((prev) => ({ ...prev, [title]: checked }));
  };

  const getDifficultyStyle = (difficulty: string) => {
    const d = difficulty.toLowerCase();
    const color =
      d === "easy"
        ? "bg-green-600 text-white"
        : d === "medium"
          ? "bg-yellow-500 text-black"
          : "bg-red-500 text-white";
    return { label: d.charAt(0).toUpperCase() + d.slice(1), color };
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700 backdrop-blur-md shadow-2xl">
      <Table className="min-w-full text-sm text-center text-gray-200">
        <TableHeader className="bg-[#14213D] text-white h-14">
          <TableRow>
            <TableHead className="w-10 text-center" />
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Difficulty</TableHead>
            <TableHead className="text-center">Frequency</TableHead>
            <TableHead className="text-center">Leetcode</TableHead>
            <TableHead className="text-center">Topics</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((q, idx) => {
            const { label, color } = getDifficultyStyle(q.Difficulty);
            return (
              <TableRow
                key={idx}
                className="hover:bg-[#223148]/60 transition-all duration-200 border-b border-[#2a2a2a] backdrop-blur-sm"
              >
                <TableCell>
                  <Checkbox
                    checked={localCache[q.Title] || false}
                    onCheckedChange={(checked: boolean) =>
                      handleCheck(q.Title, Boolean(checked))
                    }
                  />
                </TableCell>
                <TableCell className="font-medium text-gray-100">{q.Title}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${color}`}>
                    {label}
                  </span>
                </TableCell>
                <TableCell>{q.Frequency}</TableCell>
                <TableCell>
                  <div className="inline-flex items-center bg-[#FEE715]/10 px-3 py-1 rounded-full hover:scale-105 transition-transform duration-200">
                    <a
                      href={q.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#FEE715] font-medium hover:underline"
                    >
                      <Image
                        src="/images/leetcode.png"
                        alt="Leetcode"
                        width={18}
                        height={18}
                      />
                      Link
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded-full">
                    {q.Topics}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
