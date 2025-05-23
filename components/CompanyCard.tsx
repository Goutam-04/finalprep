import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
  name: string;
  logoUrl: string;
  onClick?: () => void;
};

const tooltipData: Record<string, string> = {
  Amazon: "Most asked: Merge Intervals, Sliding Window Max…",
  Google: "Most asked: 2Sum, LRU Cache…",
  Microsoft: "Most asked: Course Schedule, Clone Graph…",
  Netflix: "Most asked: Subarrays with K Different Integers…",
  Meta: "Most asked: Word Ladder, Trapping Rain Water…",
  Adobe: "Most asked: Longest Palindromic Substring…",
  Tesla: "Most asked: Median of Two Sorted Arrays…",
  SpaceX: "Most asked: Rocket Launch Simulation (Graph)…",
  Accenture: "Most asked: Greedy Algorithms, Matrix Traversal…",
  Flipkart: "Most asked: HashMap & Sliding Window Qs…",
  Samsung: "Most asked: DP on Grids, Pathfinding…",
  Airbnb: "Most asked: Backtracking, Interval Problems…",
};



export default function CompanyCard({ name, logoUrl, onClick }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={onClick}
            className="cursor-pointer p-4 rounded-xl w-full flex flex-col items-center justify-center bg-[#101820] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:border hover:border-[#FEE715]"
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
            <p className="text-lg sm:text-base text-center text-[#E0E0E0]">{name}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-[#1d2b38] text-[#E0E0E0]">
          <p className="text-sm text-gray-300">{tooltipData[name] || "Popular DSA questions inside!"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
