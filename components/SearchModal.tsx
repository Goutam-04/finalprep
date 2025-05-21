"use client";
import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Company = {
  name: string;
  logo: string;
  filename: string;
};

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filtered, setFiltered] = useState<Company[]>([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/companyList.json")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
        setFiltered(getRandomItems(data, 6));
      });
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q === "") {
      setFiltered(getRandomItems(companies, 6));
      setHighlightIndex(-1);
    } else {
      const matched = companies
        .filter((company) => company.name.toLowerCase().includes(q))
        .slice(0, 6);
      setFiltered(matched);
      setHighlightIndex(matched.length > 0 ? 0 : -1);
    }
  }, [query, companies]);

  useEffect(() => {
    if (highlightIndex >= 0 && listRef.current) {
      const child = listRef.current.children[highlightIndex] as HTMLElement;
      child?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightIndex]);

  const handleSelect = (company: Company) => {
    setOpen(false);
    setQuery("");
    setFiltered([]);
    setHighlightIndex(-1);
    router.push(`/${company.name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % filtered.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev === 0 ? filtered.length - 1 : prev - 1
      );
    }
    if (e.key === "Enter" && highlightIndex >= 0) {
      handleSelect(filtered[highlightIndex]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-xl w-full bg-[#101820] text-[#E0E0E0] rounded-lg shadow-xl p-6 border border-[#253547]"
      >
        <DialogTitle className="mb-4 text-xl font-semibold">
          Search companies
        </DialogTitle>
  
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type company name (e.g., Amazon)"
          className="bg-[#202d3b] text-white placeholder:text-gray-400 border border-[#4a5a6a] focus:ring-2 focus:ring-[#8a99af] focus:border-[#8a99af] text-base"
        />
  
        
        <div
          ref={listRef}
          className="mt-2 h-60 overflow-y-auto border border-[#334155] rounded-md bg-[#1e293b] scrollbar-hide"
        >
          {filtered.length > 0 ? (
            filtered.map((company, index) => (
              <div
                key={company.filename}
                className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors ${
                  index === highlightIndex
                    ? "bg-[#475569]"
                    : "hover:bg-[#334155]"
                }`}
                onClick={() => handleSelect(company)}
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={24}
                  height={24}
                  className="rounded"
                />
                <span className="text-sm text-white">{company.name}</span>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Image
                src="/images/no-result.png"
                alt="Not found"
                width={80}
                height={80}
              />
              <p className="mt-4 text-sm text-gray-400">Company not found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
  
}
