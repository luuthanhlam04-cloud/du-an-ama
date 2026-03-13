import { NextResponse } from "next/server";
import { analyzeMedicineImage } from "@/lib/gemini";
import { matchMedicine } from "@/lib/matcher";
// Sửa đổi 1: Nên sử dụng Prisma Client dạng Singleton nếu đã tạo file lib/db.ts
// import { db as prisma } from "@/lib/db"; 
import { PrismaClient } from "@prisma/client";

// Nếu chưa có file db.ts, dùng global để tránh tràn kết nối
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Sửa đổi 2: Ép Vercel cho phép hàm này chạy lâu hơn (tối đa 60 giây)
export const maxDuration = 60; 
export const dynamic = 'force-dynamic'; // Tắt cache cho endpoint này

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

    // Bọc trong try-catch riêng để debug nếu Gemini lỗi
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
          // Đảm bảo schema của bạn có trường isPremium
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