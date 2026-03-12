export interface MedicineResult {
  name: string;
  brandName: string | null;
  activeIngredients: string | null;
  usage: string;
  expiryDate: string | null;
  warnings: string | null;
}

export interface OCRResponse {
  success: boolean;
  data: MedicineResult | null;
  error: string | null;
  status: "success" | "pending" | "unknown_expiry" | "error";
}