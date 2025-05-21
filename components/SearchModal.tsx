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
      .then((data) => setCompanies(data));
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
    if (query.trim() === "") {
      setFiltered([]);
      setHighlightIndex(-1);
    } else {
      const q = query.toLowerCase();
      const matched = companies.filter((company) =>
        company.name.toLowerCase().includes(q)
      );
      setFiltered(matched);
      setHighlightIndex(0); // highlight first result
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

    const companySlug = company.name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/${companySlug}`);
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
      <DialogContent className="max-w-xl w-full bg-[#101820] text-[#E0E0E0] rounded-lg shadow-lg p-6">
        <DialogTitle className="mb-4 text-xl font-semibold">
          Search companies
        </DialogTitle>
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type company name (e.g., Amazon)"
          className="bg-[#1a1a1a] text-white"
        />
        {filtered.length > 0 && (
          <div
            ref={listRef}
            className="mt-2 max-h-60 overflow-y-auto border border-[#2a2a2a] rounded-md bg-[#1a1a1a]"
          >
            {filtered.map((company, index) => (
              <div
                key={company.filename}
                className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${
                  index === highlightIndex ? "bg-[#333]" : "hover:bg-[#2a2a2a]"
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
                <span className="text-sm">{company.name}</span>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
