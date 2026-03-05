// Định dạng JSON đầu ra từ Gemini API
export interface MedicineAnalysisResult {
  drugName: string;
  activeIngredient: string | null;
  form: string | null;
  usage: string | null;
  warnings: string | null;
  expiryDate: string | null;
}

// Định dạng Dữ liệu lưu trữ trong Tủ thuốc người dùng
export interface UserCabinetItem extends MedicineAnalysisResult {
  id?: string;
  userId: string;
  imageUrl: string | null;
  isVerified: boolean; 
  createdAt?: Date;
}

// Định dạng Phản hồi HTTP chuẩn cho toàn bộ Backend API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}