import { NextResponse } from "next/server";
import { analyzeMedicineImage } from "@/lib/gemini";
import { matchMedicine } from "@/lib/matcher";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    
    if (!file) {
      return NextResponse.json({ success: false, error: "File not found" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");
    const mimeType = file.type;

    let geminiResult;
    try {
      geminiResult = await analyzeMedicineImage(base64Image, mimeType);
    } catch (apiError: any) {
      console.error("Gemini API Error:", apiError);
      return NextResponse.json({ success: false, error: "Lỗi phân tích hình ảnh (AI Error)" }, { status: 502 });
    }

    const matchedMedicine = await matchMedicine(geminiResult.name);

    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: "admin@local.test",
          name: "Admin",
          isPremium: false
        }
      });
    }

    const recordStatus = geminiResult.expiryDate ? "success" : "unknown_expiry";

    const drugRecord = await prisma.drugRecord.create({
      data: {
        userId: user.id,
        medicineId: matchedMedicine ? matchedMedicine.id : null,
        detectedInfo: geminiResult,
        status: recordStatus,
      }
    });

    return NextResponse.json({
      success: true,
      data: drugRecord,
      status: recordStatus
    });

  } catch (error: any) {
    console.error("OCR Route Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
  }
}