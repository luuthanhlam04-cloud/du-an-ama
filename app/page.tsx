// app/page.tsx
"use client";

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Mic, Send, Camera, AlertTriangle, MapPin, Pill, Loader2 } from 'lucide-react';

// Import động component Map để tránh lỗi SSR của Next.js
const Map = dynamic(() => import('@/components/Map'), { ssr: false, loading: () => <p className="text-center p-4">Đang tải bản đồ...</p> });

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState<React.ReactNode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Xử lý tìm kiếm bằng giọng nói
  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      setInputText(event.results[0][0].transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Không nghe rõ, vui lòng thử lại!");
    };
  };

  // Xử lý gửi tin nhắn text
  const handleSend = () => {
    if (!inputText.trim()) return;
    
    setResult(<div className="flex items-center gap-2 text-blue-600"><Loader2 className="animate-spin" /> Đang tra cứu tương tác cho: {inputText}...</div>);
    
    // Giả lập độ trễ API 1.5s
    setTimeout(() => {
      setResult(
        <div>
          <strong className="text-red-600 flex items-center gap-2 text-lg"><AlertTriangle /> Cảnh báo tương tác:</strong>
          <p className="mt-2 text-gray-700 text-lg">Nếu bạn đang uống <b>{inputText}</b>, KHÔNG nên sử dụng đồ uống có cồn. <span className="text-red-600 font-bold">Mức độ: Cao</span>.</p>
        </div>
      );
      setInputText("");
    }, 1500);
  };

  // Xử lý khi chọn/chụp ảnh
  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResult(<div className="flex items-center gap-2 text-blue-600"><Loader2 className="animate-spin" /> Đang nhờ AI phân tích vỉ thuốc...</div>);
      
      // Giả lập độ trễ nhận diện OCR từ AI [cite: 200]
      setTimeout(() => {
        setResult(
          <div className="text-lg text-gray-800">
            <strong className="text-blue-600 text-xl block mb-2">Kết quả quét:</strong>
            <p>💊 <b>Tên thuốc:</b> Panadol</p>
            <p>📋 <b>Công dụng:</b> Giảm đau, hạ sốt</p>
            <p>📅 <b>Tình trạng:</b> <span className="text-green-600 font-bold">Còn hạn sử dụng</span></p>
            <p className="italic text-gray-500 text-sm mt-3">* Đã tự động lưu vào Tủ thuốc gia đình.</p>
          </div>
        );
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans pb-10">
      {/* Header */}
      <header className="bg-blue-600 text-white p-5 text-center shadow-md rounded-b-3xl">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Pill size={28} /> Tủ Thuốc Gia Đình
        </h1>
        <p className="text-blue-100 text-sm mt-1">Trợ lý y tế thông minh của bạn</p>
      </header>

      <main className="max-w-xl mx-auto mt-6 px-4 space-y-6">
        
        {/* Khu vực Nhập liệu & Công cụ */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập tên thuốc, triệu chứng..." 
              className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button 
              onClick={handleVoiceSearch}
              className={`p-4 rounded-xl transition-colors ${isListening ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}
              title="Tìm kiếm giọng nói"
            >
              {isListening ? <Loader2 className="animate-spin" size={24} /> : <Mic size={24} />}
            </button>
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Send size={24} />
            </button>
          </div>

          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            ref={fileInputRef} 
            onChange={handleImageCapture}
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full mt-4 bg-emerald-50 text-emerald-700 border-2 border-emerald-200 p-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors"
          >
            <Camera size={26} /> Quét vỉ thuốc thông minh
          </button>
        </section>

        {/* Khu vực Hiển thị Kết quả */}
        {result && (
          <section className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r-xl shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            {result}
          </section>
        )}

        {/* Cảnh báo y tế */}
        <p className="text-center text-red-500 font-medium text-sm px-4 flex items-center justify-center gap-1">
          <AlertTriangle size={16} /> Chỉ mang tính tham khảo, không thay thế bác sĩ! [cite: 139]
        </p>

        {/* Khu vực Bản đồ */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mt-8">
          <h2 className="text-xl font-bold text-blue-800 mb-1 flex items-center gap-2">
            <MapPin className="text-blue-600" /> Nhà thuốc gần bạn
          </h2>
          <p className="text-gray-500 mb-4">Các cơ sở đang có sẵn thuốc bạn cần tìm.</p>
          <Map />
        </section>

      </main>
    </div>
  );
}
