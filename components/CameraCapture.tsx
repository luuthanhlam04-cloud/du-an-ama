"use client";

import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Camera, Upload } from "lucide-react";
import { motion } from "framer-motion";

interface CameraCaptureProps {
  onCapture: (file: File) => void;
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const [hasError, setHasError] = useState(false);
  const webcamReference = useRef<Webcam>(null);

  const handleUserMediaError = useCallback(() => {
    setHasError(true);
  }, []);

  const captureStream = useCallback(() => {
    const imageBase64 = webcamReference.current?.getScreenshot();
    if (imageBase64) {
      fetch(imageBase64)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
          onCapture(file);
        });
    }
  }, [onCapture]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onCapture(file);
    }
  };

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-sm">
        <Upload className="w-16 h-16 text-slate-300 mb-6" />
        <p className="text-slate-600 mb-6 text-center font-medium">Trình duyệt từ chối quyền Camera hoặc thiếu HTTPS. Vui lòng tải ảnh lên.</p>
        <label className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold cursor-pointer hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
          Chọn ảnh từ thiết bị
          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl ring-1 ring-white/10">
      <Webcam
        audio={false}
        ref={webcamReference}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "environment" }}
        onUserMediaError={handleUserMediaError}
        className="w-full h-[65vh] object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-40 border-2 border-white/60 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] backdrop-blur-[1px]"></div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <button onClick={captureStream} className="bg-white text-slate-900 p-5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 active:scale-95 transition-all">
          <Camera className="w-8 h-8" />
        </button>
      </div>
    </motion.div>
  );
}