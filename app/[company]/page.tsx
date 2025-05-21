import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import CompanyTable from "@/components/CompanyTable";

interface Props {
  params: { company: string };
}

interface Question {
  Title: string;
  Difficulty: string;
  Frequency: number;
  "Acceptance Rate": number;
  Topics: string;
  Link: string;
}

export default function CompanyPage({ params }: Props) {
  const { company } = params;

  const filePath = path.join(process.cwd(), "public", "data", `${company}.json`);
  let questions: Question[] = [];

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    questions = JSON.parse(fileContent) as Question[];
  } catch {
    return notFound();
  }

  return (
    <div className="p-6">
      <h1 className="relative text-2xl font-bold mb-6 capitalize">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-yellow-400 rounded-sm -ml-4 hidden sm:inline-block" />
        {company} DSA Questions
      </h1>
      <CompanyTable data={questions} />
    </div>
  );
}
