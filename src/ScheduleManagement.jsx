import { useState, useEffect } from 'react';

export default function ScheduleManagement() {
  const [departements, setDepartements] = useState([]);
  const [specialites, setSpecialites] = useState([]);

  const [iddep, setIddep] = useState('');
  const [idspc, setIdspc] = useState('');
  const [idcycle, setIdcycle] = useState('');
  const [niveau, setNiveau] = useState('');
  const [groupe, setGroupe] = useState('');

  const [emploi, setEmploi] = useState([]);

  useEffect(() => {
    fetch('http://localhost/universityapp/get-departements.php')
      .then(res => res.json())
      .then(data => setDepartements(data));

    fetch('http://localhost/universityapp/get-specialites.php')
      .then(res => res.json())
      .then(data => setSpecialites(data));
  }, []);

  useEffect(() => {
    if (iddep && idspc && idcycle && niveau && groupe) {
      const url = `http://localhost/universityapp/get-listemploi.php?iddep=${iddep}&idspc=${idspc}&idcycle=${idcycle}&niveau=${niveau}&groupe=${groupe}`;
      console.log("Fetching emploi from:", url); // فقط لأغراض التحقق
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setEmploi(data);
          console.log("Received emploi:", data); // فقط لأغراض التحقق
        })
        .catch(err => console.error('Error fetching emploi:', err));
    }
  }, [iddep, idspc, idcycle, niveau, groupe]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="absolute top-4 left-4 flex gap-4">
  {/* زر العودة */}
  <button
    onClick={() => window.history.back()}
    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
  >
    🔙 عودة
  </button>

  {/* زر تسجيل الخروج */}
  <button
    onClick={() => {
      // هنا يمكنك حذف التوكن أو بيانات الجلسة
      localStorage.clear(); // أو localStorage.removeItem('token')
      window.location.href = '/'; // غيّر المسار حسب مسار تسجيل الدخول
    }}
    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
  >
    🚪 تسجيل خروج
  </button>
</div>

      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">تسيير استعمال الزمن</h2>

      <div dir="rtl" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <select className="p-2 border rounded" value={iddep} onChange={(e) => setIddep(e.target.value)}>
          <option value="">اختر القسم</option>
          {departements.map(dep => (
            <option key={dep.iddep} value={dep.iddep}>{dep.nomdep}</option>
          ))}
        </select>

        <select className="p-2 border rounded" value={idspc} onChange={(e) => setIdspc(e.target.value)}>
          <option value="">اختر التخصص</option>
          {specialites.map(spc => (
            <option key={spc.idspc} value={spc.idspc}>{spc.nomspc}</option>
          ))}
        </select>

        <select className="p-2 border rounded" value={idcycle} onChange={(e) => setIdcycle(e.target.value)}>
          <option value="">اختر الدورة</option>
          <option value="01">ليسانس</option>
          <option value="02">ماستر</option>
        </select>

        <select className="p-2 border rounded" value={niveau} onChange={(e) => setNiveau(e.target.value)}>
          <option value="">اختر السنة</option>
          <option value="1">السنة الأولى</option>
          <option value="2">السنة الثانية</option>
          <option value="3">السنة الثالثة</option>
        </select>

        <select className="p-2 border rounded" value={groupe} onChange={(e) => setGroupe(e.target.value)}>
          <option value="">اختر الفوج</option>
          {["1", "2", "3", "4", "5"].map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* عرض جدول استعمال الزمن */}
      {emploi.length > 0 && (
        <div className="overflow-x-auto">
          <table dir="rtl" className="min-w-full border border-gray-300 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">اليوم</th>
                <th className="border p-2">10:00-08:30</th>
                <th className="border p-2">11:30-10:00</th>
                <th className="border p-2">13:00-11:30</th>
                <th className="border p-2">15:00-13:30</th>
                <th className="border p-2">16:30-15:00</th>
              </tr>
            </thead>
            <tbody>
              {emploi.map((row, index) => (
                <tr key={index}>
                  <td className="border p-2">{row.day}</td>
                  <td className="border p-2">{row["08:30-10:00"]}</td>
                  <td className="border p-2">{row["10:00-11:30"]}</td>
                  <td className="border p-2">{row["11:30-13:00"]}</td>
                  <td className="border p-2">{row["13:30-15:00"]}</td>
                  <td className="border p-2">{row["15:00-16:30"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {emploi.length === 0 && iddep && idspc && idcycle && niveau && groupe && (
  <p className="text-center text-gray-500 mt-4">لا يوجد استعمال زمن مطابق للخيارات المحددة</p>
)}

    </div>
  );
}
