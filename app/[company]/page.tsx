import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import CompanyTable from "@/components/CompanyTable";

interface Props {
  params: { company: string };
}

export default function CompanyPage({ params }: Props) {
  const { company } = params;

  const filePath = path.join(process.cwd(), "public", "data", `${company}.json`);
  let questions: any[] = [];

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    questions = JSON.parse(fileContent);
  } catch (err) {
    return notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">{company} DSA Questions</h1>
      <CompanyTable data={questions} />
    </div>
  );
}
