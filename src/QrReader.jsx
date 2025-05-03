import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export default function EtudiantPage() {
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();
  const html5QrCodeRef = useRef(null);

  const stopScannerSafely = async () => {
    if (html5QrCodeRef.current) {
      try {
        if (html5QrCodeRef.current.getState() === 2) { 
          await html5QrCodeRef.current.stop();
          await html5QrCodeRef.current.clear();
          console.log("✅ تم إيقاف الكاميرا بنجاح");
        } else {
          console.log("⚪ الكاميرا ليست نشطة، لا حاجة للإيقاف");
        }
      } catch (err) {
        console.warn("⚠️ خطأ أثناء محاولة إيقاف الكاميرا:", err);
      }
    }
  };

  useEffect(() => {
    const qrRegionId = "reader";

    const qrCodeSuccessCallback = (decodedText) => {
      setIsScanning(false);
      stopScannerSafely();
      // التحقق من الكود
      fetch("https://gestiondesetudiants.great-site.net/check_qr.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: decodedText }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            navigate("/student-dashboard", { state: { studentId: decodedText } });
          } else {
            setError("❌ هذا الكود غير موجود، تأكد من صحة البطاقة.");
          }
        })
        .catch(() => {
          setError("⚠️ حدث خطأ أثناء الاتصال بالخادم.");
        });
    };

    const qrCodeErrorCallback = (errorMessage) => {
      // تجاهل أخطاء القراءة المتكررة
    };

    const startScanner = async () => {
      try {
        html5QrCodeRef.current = new Html5Qrcode(qrRegionId);
        await html5QrCodeRef.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          qrCodeSuccessCallback,
          qrCodeErrorCallback
        );
        setIsScanning(true);
        setError("");
      } catch (err) {
        console.error("📛 فشل في تشغيل الكاميرا:", err);
        setError("📛 فشل في تشغيل الكاميرا. تأكد من السماح للكاميرا.");
      }
    };

    const timer = setTimeout(() => {
      startScanner();
    }, 0);

    return () => {
      clearTimeout(timer);
      stopScannerSafely();
    };
  }, [navigate]);

  const handleCancel = async () => {
    console.log("🔵 تنفيذ إلغاء...");
    setIsScanning(false);
    await stopScannerSafely();
    navigate("/");
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">📷 مسح بطاقة الطالب</h1>

        <div id="reader" className="mb-4 w-full" />

        {isScanning && !error && (
          <p className="text-gray-500 mb-2">📎 الرجاء توجيه البطاقة نحو الكاميرا</p>
        )}

        {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          {(isScanning || error) && (
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full"
            >
              إلغاء
            </button>
          )}



          {error && (
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full"
            >
              🔁 إعادة المحاولة
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
