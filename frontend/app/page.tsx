"use client";

import { homeService } from "@/services/homeService";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { useState } from "react";
import { HomeCard } from "@/components/home/homecard";
import { useEffect } from "react";

export default function Home() {
  const [homes, setHomeData] = useState([]);
  const [loading, setLoading] = useState(true); // เพิ่ม loading state สไตล์ที่คุณถนัด
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/admin/0");
  };

  const fetchInitialData = async () => {
    try {
      const data = await homeService.getHomeData();
      setHomeData(data || []);
    } catch (error) {
      console.error("Fetch error:", error.message);
      showToast.error("ไม่สามารถโหลดข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  // 2. ย้าย Logic มาไว้ในนี้
  useEffect(() => {
    fetchInitialData();
  }, []); // [] หมายถึงทำแค่ครั้งเดียวตอน Component mount

  // ถ้ายังโหลดอยู่ อาจจะแสดง Loading สวยๆ ก่อน
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        กำลังโหลด...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl font-bold mb-4"> ยินดีต้อนรับ! </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        ยินดีต้อนรับสู่เว็บไซต์Homeของเรา!นี่คือหน้าหลักที่คุณสามารถเข้าถึงข้อมูลได้อย่างง่ายดาย
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {homes.length > 0 ? (
          homes.map((item, index) => (
            <HomeCard
              id={item.home_id}
              key={item.home_id || index}
              name={item.home_name}
              address={item.home_address}
              index={index}
            />
          ))
        ) : (
          /* Empty State */
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">ยังไม่มีข้อมูลบ้านในขณะนี้</p>
          </div>
        )}
      </div>

      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNavigate}
        >
          เพิ่มข้อมูล
        </button>
      </div>
    </div>
  );
}
