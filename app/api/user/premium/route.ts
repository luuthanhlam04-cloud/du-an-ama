import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Tương tự, quản lý kết nối Prisma
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Tắt cache để nút bật/tắt luôn cập nhật trạng thái mới nhất
export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    let user = await prisma.user.findFirst();
    
    // Sửa đổi: Nếu không có user, hãy tạo mới một user mặc định thay vì báo lỗi 404
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: "admin@local.test",
          name: "Admin",
          isPremium: false // Khởi tạo mặc định
        }
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { isPremium: !user.isPremium }
    });

    return NextResponse.json({ success: true, isPremium: updatedUser.isPremium });
  } catch (error: any) {
    console.error("Premium Update Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}