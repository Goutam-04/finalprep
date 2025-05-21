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
        ? "bg-green-500"
        : d === "medium"
        ? "bg-orange-500"
        : "bg-red-500";
    return { label: d.charAt(0).toUpperCase() + d.slice(1), color };
  };

  return (
    <Table className="text-sm border border-gray-600">
      <TableHeader className="bg-gray-800 text-white">
        <TableRow>
          <TableHead className="w-8" />
          <TableHead>Title</TableHead>
          <TableHead>Difficulty</TableHead>
          <TableHead>Frequency</TableHead>
          {/* <TableHead>Acceptance Rate</TableHead> */}
          <TableHead>Topics</TableHead>
          <TableHead>Leetcode</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((q, idx) => {
          const { label, color } = getDifficultyStyle(q.Difficulty);
          return (
            <TableRow key={idx} className="hover:bg-gray-700">
              <TableCell>
                <Checkbox
                  checked={localCache[q.Title] || false}
                  onCheckedChange={(checked: boolean) =>
                    handleCheck(q.Title, Boolean(checked))
                  }
                />
              </TableCell>
              <TableCell>{q.Title}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${color}`} />
                  {label}
                </div>
              </TableCell>
              <TableCell>{q.Frequency}</TableCell>
              {/* <TableCell>
                {(parseFloat(q["Acceptance Rate"]) * 100).toFixed(2)}%
              </TableCell> */}
              <TableCell>{q.Topics}</TableCell>
              <TableCell>
                <a
                  href={q.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-400 hover:underline"
                >
                  <Image src="/leetcode.png" alt="Leetcode" width={18} height={18} />
                  Link
                </a>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
