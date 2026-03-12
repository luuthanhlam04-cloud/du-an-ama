"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, Plus, Lock, Pill, Settings } from "lucide-react";

interface User {
  id: string;
  isPremium: boolean;
}

interface Record {
  id: string;
  status: string;
  detectedInfo: any;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/user/data");
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setRecords(data.records);
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const togglePremium = async () => {
    try {
      const response = await fetch("/api/user/premium", { method: "POST" });
      const data = await response.json();
      if (data.success && user) {
        setUser({ ...user, isPremium: data.isPremium });
      }
    } catch (error) {
      console.error("Lỗi cập nhật Premium", error);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans font-bold text-slate-500">Đang tải dữ liệu...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-6 relative">
        <button onClick={togglePremium} className="absolute -top-4 -right-2 p-2 text-slate-300 hover:text-slate-600 transition-colors" title="Toggle Premium (Dev Only)">
           <Settings className="w-5 h-5" />
        </button>

        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Tủ thuốc của tôi</h1>
            <p className="text-slate-500 font-medium mt-1">
              Trạng thái: {user?.isPremium ? <span className="text-blue-600 font-bold">Premium</span> : <span className="text-slate-500 font-bold">Cơ bản</span>}
            </p>
          </div>
          <Link href="/scan" className="bg-blue-600 text-white p-4 rounded-2xl shadow-md hover:bg-blue-700 transition-colors">
            <Plus className="w-6 h-6" />
          </Link>
        </div>

        {!user?.isPremium && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 rounded-3xl shadow-md text-white flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Lock className="w-5 h-5" /> Mở khóa tính năng an toàn
              </h2>
              <p className="font-medium mt-1 opacity-90">Cảnh báo tương tác thuốc tự động</p>
            </div>
            <button className="bg-white text-orange-600 px-4 py-2 rounded-xl font-bold shadow-sm hover:scale-105 transition-transform">
              Nâng cấp
            </button>
          </div>
        )}

        <div className="space-y-4">
          {records.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
              <Pill className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Tủ thuốc trống</p>
            </div>
          ) : (
            records.map((record) => {
              const info = record.detectedInfo as any;
              return (
                <div key={record.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{info.name}</h3>
                      {info.brandName && <p className="text-slate-500 font-medium">{info.brandName}</p>}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${record.status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {record.status === "success" ? "An toàn" : "Thiếu HSD"}
                    </span>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-slate-800 font-medium text-sm">{info.usage}</p>
                  </div>

                  {info.warnings && user?.isPremium && (
                    <div className="flex gap-2 items-start bg-amber-50 p-3 rounded-xl border border-amber-100">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-amber-800 text-sm font-medium">{info.warnings}</p>
                    </div>
                  )}

                  {info.warnings && !user?.isPremium && (
                    <div className="flex gap-2 items-center justify-center bg-slate-100 p-3 rounded-xl border border-slate-200 blur-[1px] select-none">
                      <Lock className="w-4 h-4 text-slate-400" />
                      <p className="text-slate-500 text-sm font-bold">Tính năng Premium</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}