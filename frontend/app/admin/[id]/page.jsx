"use client";

import React, { useEffect, useState } from "react"; // เพิ่ม useEffect
import { homeService } from "@/services/homeService";
import { showToast } from "@/lib/toast";
import { useRouter, useParams } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();
  const routeParams = useParams();

  const id = routeParams.id || "";
  const editMode = id && id !== "0"; 

  const [homeData, setHomeData] = useState({
    name: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode) {
      const loadData = async () => {
        try {
          const res = await homeService.getHomeById(id);
          if (res?.data) {
            setHomeData({
              name: res.data.name,
              address: res.data.address,
            });
          }
        } catch (error) {
          showToast.error("โหลดข้อมูลเดิมไม่สำเร็จ");
        }
      };
      loadData();
    }
  }, [id, editMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!homeData.name.trim() || !homeData.address.trim()) {
      showToast.warning("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setLoading(true);

    try {
      if (editMode) {
        // --- 2. LOGIC แก้ไขข้อมูล ---
        await homeService.updateHome(id, homeData);
        showToast.success("แก้ไขข้อมูลบ้านสำเร็จ!");
        setHomeData({ name: "", address: "" });
      } else {
        // --- 3. LOGIC เพิ่มข้อมูล ---
        await homeService.createHome(homeData);
        showToast.success("เพิ่มข้อมูลบ้านสำเร็จ!");
        setHomeData({ name: "", address: "" }); // ล้างฟอร์มเฉพาะตอนเพิ่มใหม่
      }
    } catch (error) {
      showToast.error(editMode ? "แก้ไขล้มเหลว" : "เพิ่มข้อมูลล้มเหลว");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {editMode ? "แก้ไขข้อมูลบ้าน" : "เพิ่มข้อมูลบ้าน"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ชื่อบ้าน
            </label>
            <input
              type="text"
              placeholder="เช่น บ้านกลางเมือง"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={homeData.name}
              onChange={(e) =>
                setHomeData({ ...homeData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              ที่อยู่
            </label>
            <textarea
              placeholder="กรอกที่อยู่โดยละเอียด"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32 transition-all"
              value={homeData.address}
              onChange={(e) =>
                setHomeData({ ...homeData, address: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md"
            }`}
          >
            {loading
              ? "กำลังดำเนินการ..."
              : editMode
                ? "บันทึกการแก้ไข"
                : "กดเพื่อเพิ่มข้อมูล"}
          </button>
        </form>
      </div>
    </div>
  );
}
