import { NextResponse } from "next/server";
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

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockMedicines = [
      {
        name: "Loperamid",
        brandName: "Loperamid 2mg",
        activeIngredients: "Loperamide hydrochloride 2mg",
        usage: "Người lớn: Khởi đầu 4mg, sau đó 2mg sau mỗi lần tiêu phân lỏng. Tối đa 16mg/ngày.",
        expiryDate: "15/05/2026",
        warnings: "Không dùng cho trẻ em dưới 12 tuổi, người bị viêm loét đại tràng cấp, lỵ cấp tính."
      },
      {
        name: "Praverix",
        brandName: "Praverix",
        activeIngredients: "Pantoprazole 40mg",
        usage: "Uống 1 viên/ngày vào buổi sáng trước bữa ăn 1 giờ. Nuốt nguyên viên, không nhai hoặc nghiền.",
        expiryDate: "20/08/2025",
        warnings: "Thận trọng với bệnh nhân suy gan nặng. Có thể che lấp triệu chứng ung thư dạ dày."
      },
      {
        name: "Boganic",
        brandName: "Traphaco Boganic",
        activeIngredients: "Cao Actisô, Cao Rau đắng đất, Cao Bìm bìm",
        usage: "Người lớn: 1-2 viên/lần x 3 lần/ngày. Trẻ em trên 8 tuổi: 1 viên/lần x 2-3 lần/ngày.",
        expiryDate: "12/10/2026",
        warnings: "Thận trọng với người mẫn cảm với bất cứ thành phần nào của thuốc. Phụ nữ có thai cần hỏi ý kiến bác sĩ."
      },
      {
        name: "Hometex",
        brandName: "Hometex",
        activeIngredients: "Bromhexin hydroclorid 8mg",
        usage: "Người lớn và trẻ em trên 12 tuổi: 1 viên/lần x 3 lần/ngày.",
        expiryDate: "05/11/2025",
        warnings: "Tránh dùng chung với thuốc ho khác. Thận trọng với bệnh nhân loét dạ dày."
      },
      {
        name: "Cotrimoxazol",
        brandName: "Cotrimoxazol 480mg",
        activeIngredients: "Sulfamethoxazol 400mg, Trimethoprim 80mg",
        usage: "Người lớn: 2 viên/lần x 2 lần/ngày, cách nhau 12 giờ.",
        expiryDate: "30/01/2027",
        warnings: "Chống chỉ định với người dị ứng Sulfa, suy thận nặng, phụ nữ có thai và cho con bú."
      }
    ];

    const mockResult = mockMedicines[Math.floor(Math.random() * mockMedicines.length)];

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

    const drugRecord = await prisma.drugRecord.create({
      data: {
        userId: user.id,
        medicineId: null, 
        detectedInfo: mockResult,
        status: "success",
      }
    });

    return NextResponse.json({
      success: true,
      data: drugRecord,
      status: "success"
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Lỗi hệ thống" }, { status: 500 });
  }
}