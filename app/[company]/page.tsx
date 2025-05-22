import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import CompanyTable from "@/components/CompanyTable";

interface Question {
  Title: string;
  Difficulty: string;
  Frequency: number;
  Topics: string;
  Link: string;
  AcceptanceRate: number;
}

// Define the type as a Promise this is breaking in next 15 update  
export type CompanyParams = Promise<{ company: string }>;

export default async function CompanyPage({
  params,
}: {
  params: CompanyParams;
}) {
  const { company } = await params;

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
