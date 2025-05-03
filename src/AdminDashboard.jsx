import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Search } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showStudentTable, setShowStudentTable] = useState(false);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    navigate('/');
  };
  const handleEdit = (student) => {
    // لاحقًا: يمكنك فتح نافذة تعديل أو الانتقال إلى صفحة التعديل
    alert(`تعديل الطالب: ${student.nom} ${student.prenom}`);
  };
  
  const handleDelete = async (id) => {
    const confirmed = window.confirm("هل أنت متأكد أنك تريد حذف هذا الطالب؟");
    if (confirmed) {
      try {
        const res = await fetch(`http://localhost/universityapp/delete-student.php?id=${id}`, {
          method: 'DELETE',
        });
        const result = await res.json();
        if (result.success) {
          setStudents(students.filter(s => s.idetudiant !== id));
        } else {
          alert('فشل في الحذف');
        }
      } catch (error) {
        console.error('خطأ أثناء الحذف:', error);
        alert('حدث خطأ أثناء الحذف');
      }
    }
  };
  
  const handleManageStudents = () => {
    setShowStudentTable(!showStudentTable); // التبديل بين الإظهار والإخفاء
    if (!showStudentTable && students.length === 0) {
      fetch("https://gestiondesetudiants.great-site.net/getlist-student-info.php")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setStudents(data);
          } else {
            console.error(data.error);
          }
        });
    }
  };

  const handleManageSchedule = () => {
    navigate('/schedule');
  };

  const filteredStudents = students.filter(student =>
    `${student.nom} ${student.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row-reverse justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-700">لوحة التحكم</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            تسجيل الخروج
          </button>
        </div>

        {/* الأزرار */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          <div
            onClick={handleManageStudents}
            className="cursor-pointer bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center flex flex-col items-center justify-center"
          >
            <Users className="text-blue-500" size={48} />
            <h2 className="text-xl font-semibold mt-4 text-gray-700">تسيير الطلبة</h2>
          </div>

          <div
            onClick={handleManageSchedule}
            className="cursor-pointer bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center flex flex-col items-center justify-center"
          >
            <Calendar className="text-green-500" size={48} />
            <h2 className="text-xl font-semibold mt-4 text-gray-700">تسيير استعمال الزمن</h2>
          </div>
        </div>

        {/* جدول الطلبة */}
        {showStudentTable && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-4">

  {/* زر إضافة طالب */}
  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
    
>+ إضافة طالب</button>

            <h2 className="text-2xl font-bold text-gray-700 text-center flex-1">قائمة الطلبة</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن طالب..."
                  className="pl-8 pr-2 py-2 border border-gray-300 rounded focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={18} className="absolute left-2 top-2.5 text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table dir="rtl" className="min-w-full border border-gray-300 text-right">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">رمز الطالب</th>
                    <th className="border p-2">اللقب</th>
                    <th className="border p-2">الاسم</th>
                    <th className="border p-2">تاريخ الميلاد</th>
                    <th className="border p-2">مكان الميلاد</th>
                    <th className="border p-2">المعهد</th>
                    <th className="border p-2">التخصص</th>
                    <th className="border p-2">المستوى</th>
                    <th className="border p-2">الدورة</th>
                    <th className="border p-2">الفوج</th>
                    <th className="border p-2">العمليات</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="border p-2">{student.idetudiant}</td>
                      <td className="border p-2">{student.nom}</td>
                      <td className="border p-2">{student.prenom}</td>
                      <td className="border p-2">{student.dnais}</td>
                      <td className="border p-2">{student.lnais}</td>
                      <td className="border p-2">{student.nomdep}</td>
                      <td className="border p-2">{student.nomspc}</td>
                      <td className="border p-2">
                        {student.niveau === '1' ? 'الأولى' :
                        student.niveau === '2' ? 'الثانية' :
                        student.niveau === '3' ? 'الثالثة' :
                        student.niveau}
                     </td>
                      <td className="border p-2">{student.nomcycle}</td>
                      <td className="border p-2">{student.groupe}</td>
                      <td className="border p-2 flex gap-2 justify-center">
  <button
    onClick={() => handleEdit(student)}
    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500"
  >
    تعديل
  </button>
  <button
    onClick={() => handleDelete(student.idetudiant)}
    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
  >
    حذف
  </button>
</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
