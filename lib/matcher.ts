import Fuse from "fuse.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function matchMedicine(scannedName: string) {
  const medicines = await prisma.medicine.findMany();
  
  const fuse = new Fuse(medicines, {
    keys: ["name", "brandName", "ingredients"],
    threshold: 0.4,
  });

  const results = fuse.search(scannedName);
  return results.length > 0 ? results[0].item : null;
}