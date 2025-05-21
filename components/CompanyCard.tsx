import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
  name: string;
  logoUrl: string;
  onClick?: () => void;
};

const tooltipData: Record<string, string> = {
  Google: "Most asked: 2Sum, LRU Cache…",
  Amazon: "Most asked: Merge Intervals, Sliding Window Max…",
  Microsoft: "Most asked: Course Schedule, Clone Graph…",
  Meta: "Most asked: Word Ladder, Trapping Rain Water…",
  Netflix: "Most asked: Subarrays with K Different Integers…",
  Adobe: "Most asked: Longest Palindromic Substring…",
  Tesla: "Most asked: Median of Two Sorted Arrays…",
  SpaceX: "Most asked: Rocket Launch Simulation (Graph)…",
  NVIDIA: "Most asked: DP + Graph Hybrid Problems…",
  Stripe: "Most asked: Interval Problems, Design LRU…",
  Github: "Most asked: Git Tree Parsing, DFS/Graph Qs…",
  Snapchat: "Most asked: Flood Fill, Graph Traversal…",
};

export default function CompanyCard({ name, logoUrl, onClick }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={onClick}
            className="cursor-pointer p-4 rounded-xl w-full flex flex-col items-center justify-center bg-[#1a1a1a] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:border hover:border-[#FEE715]"
          >
            <div className="w-12 h-12 flex items-center justify-center mb-2">
              <Image
                src={logoUrl}
                alt={name}
                width={40}
                height={40}
                className="object-contain max-h-full"
              />
            </div>
            <p className="text-sm sm:text-base text-center text-[#E0E0E0]">{name}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm text-gray-300">{tooltipData[name] || "Popular DSA questions inside!"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
