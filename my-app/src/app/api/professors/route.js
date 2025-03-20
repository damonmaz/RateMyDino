import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req) {
  const filePath = path.join(process.cwd(), "../../professor_map.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const professors = JSON.parse(jsonData);

  const professorArray = Object.entries(professors).map(([id, name]) => ({
    id,
    name,
  }));

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("search")?.toLowerCase() || "";

  const filteredProfessors = query
    ? professorArray.filter((prof) => prof.name.toLowerCase().includes(query))
    : professorArray;

  return NextResponse.json(filteredProfessors);
}
