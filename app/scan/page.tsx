"use client";

import { useState } from "react";
import CameraCapture from "@/components/CameraCapture";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Info, Loader2 } from "lucide-react";
import { MedicineResult } from "@/types";

export default function ScanPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<MedicineResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCapture = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.data) {
        setResult(data.data.detectedInfo);
      } else {
        setError(data.error || "Không thể phân tích ảnh");
      }
    } catch (err) {
      setError("Lỗi kết nối máy chủ");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Quét Đơn Thuốc</h1>
          <p className="text-slate-500 font-medium">Đặt vỉ thuốc vào khung hình để AI phân tích</p>
        </div>

        {!result && !isProcessing && (
          <CameraCapture onCapture={handleCapture} />
        )}

        {isProcessing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-slate-600 font-medium animate-pulse">Hệ thống đang đối soát dữ liệu y khoa...</p>
          </motion.div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
            <p className="text-red-800 font-medium">{error}</p>
          </motion.div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-blue-600 p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-blue-200" />
                <span className="text-blue-100 font-semibold text-sm uppercase tracking-wider">Đã xác thực</span>
              </div>
              <h2 className="text-2xl font-bold">{result.name}</h2>
              {result.brandName && <p className="text-blue-100 font-medium mt-1">{result.brandName}</p>}
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Thành phần hoạt tính</h3>
                <p className="text-slate-800 font-medium">{result.activeIngredients || "Không xác định"}</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Liều dùng khuyến nghị</h3>
                <p className="text-slate-800 font-medium leading-relaxed">{result.usage}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hạn sử dụng</h3>
                  <p className={`font-bold ${!result.expiryDate ? "text-amber-600" : "text-slate-800"}`}>
                    {result.expiryDate || "Không tìm thấy"}
                  </p>
                </div>
              </div>

              {result.warnings && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 mt-4">
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-amber-800 text-sm font-medium leading-relaxed">{result.warnings}</p>
                </div>
              )}

              <button onClick={() => setResult(null)} className="w-full mt-6 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-md hover:bg-slate-800 hover:shadow-lg transition-all active:scale-[0.98]">
                Lưu vào Tủ thuốc & Quét tiếp
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}