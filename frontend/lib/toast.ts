import { toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  // คุณสามารถปรับแก้ options เริ่มต้นได้ที่นี่
};

export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, { ...defaultOptions, ...options });
  },
  
  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, { ...defaultOptions, ...options });
  },
  
  warning: (message: string, options?: ToastOptions) => {
    return toast.warn(message, { ...defaultOptions, ...options });
  },
  
  info: (message: string, options?: ToastOptions) => {
    return toast.info(message, { ...defaultOptions, ...options });
  },

  // แถม: ตัวช่วยจัดการ Error จาก API
  apiError: (error: any) => {
    const msg = error?.response?.data?.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
    return toast.error(msg, defaultOptions);
  }
};
