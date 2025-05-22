// lib/getCompanyData.ts
import fs from "fs";
import path from "path";

export interface Question {
  Title: string;
  Difficulty: string;
  Frequency: number;
  AcceptanceRate: number;
  Link: string;
  Topics: string;
}

export async function getCompanyData(company: string): Promise<Question[] | null> {
  const filePath = path.join(process.cwd(), "public", "data", `${company}.json`);

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const rawData: unknown = JSON.parse(fileContent);

    if (!Array.isArray(rawData)) return null;

    const parsedData: Question[] = rawData.map((item): Question => ({
      Title: String(item["Title"]),
      Difficulty: String(item["Difficulty"]),
      Frequency: parseFloat(String(item["Frequency"])),
      AcceptanceRate: parseFloat(String(item["Acceptance Rate"])),
      Link: String(item["Link"]),
      Topics: String(item["Topics"])
    }));

    return parsedData;
  } catch (error) {
    console.error("Error loading company data:", error);
    return null;
  }
}
