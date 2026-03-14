"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Camera } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (file: File) => void;
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
            onCapture(file);
          }
        }, "image/jpeg", 0.7); // Nén ảnh mức 0.7 tại client để tránh timeout
      }
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-3xl bg-black aspect-[4/5] shadow-inner">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="object-cover w-full h-full"
      />
      
      {/* Lớp phủ làm tối không gian bên ngoài khung */}
      <div className="absolute inset-0 z-10 pointer-events-none border-[50px] border-black/40"></div>

      {/* Khung viền trắng xác định vùng lấy nét (không sử dụng blur) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-32 border-2 border-white rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center">
        <button
          onClick={handleCapture}
          className="p-4 bg-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          <Camera className="w-8 h-8 text-slate-800" />
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}