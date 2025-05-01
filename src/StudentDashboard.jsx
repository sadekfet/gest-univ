import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaUser, FaSignOutAlt } from "react-icons/fa"; // أيقونات
import axios from "axios"; // تأكد من أنك استعملت axios
import { motion } from "framer-motion";


export default function StudentDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [studentInfo, setStudentInfo] = useState({ nom: "", prenom: "", lnais: "", dnais: "", nomdep: "", nomspc: "", nomcycle: "", niveau: "", groupe: "" }); // تعريف حالة studentInfo
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [showTimetablevide, setshowTimetablevide] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showStudentInfo, setShowStudentInfo] = useState(false);
  const [emploiData, setEmploiData] = useState(null); // البيانات الخاصة بالجدول
  const [showTimetable, setShowTimetable] = useState(false); // حالة عرض الجدول

  // إرسال النموذج (فتح Gmail)
  const handleSubmit = (e) => {
    e.preventDefault();

    // إعداد رابط "mailto" مع البيانات
    const subject = encodeURIComponent("استفسار من الطالب");
    const body = encodeURIComponent(`الاسم: ${name}\nالبريد الإلكتروني: ${email}\n\nرسالتك: \n${message}`);
    const mailtoLink = `mailto:admin@univ-relizane.dz?subject=${subject}&body=${body}`;

    // فتح نافذة Gmail
    window.location.href = mailtoLink;
  };

  // عند الضغط على زر الموقع الجغرافي
  const handleMapClick = () => {
    setShowMap(true);            // إظهار الخريطة
    setShowStudentInfo(false);    // إخفاء معلومات الطالب الشخصية
    setShowContactForm(false);   // إخفاء نموذج الاتصال
    setShowTimetable(false);    // إخفاء إستعمال الزمن
    setshowTimetablevide(false);
  };

  // عند الضغط على زر إتصل بنا
  const handleContactClick = () => {
    setShowMap(false);           // إخفاء الخريطة
    setShowStudentInfo(false);    // إخفاء معلومات الطالب الشخصية
    setShowContactForm(true);    // إظهار نموذج الاتصال
    setShowTimetable(false);    // إخفاء إستعمال الزمن
    setshowTimetablevide(false);
  };

  const fetchTimetable = () => {
    axios
      .get(`http://localhost/universityapp/get-emploi.php?id=${studentId}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setEmploiData(response.data); // تخزين البيانات في الحالة
          setShowTimetable(true); // إظهار الجدول
          setShowMap(false);            // إظهار الخريطة
          setShowStudentInfo(false);    // إخفاء معلومات الطالب الشخصية
          setShowContactForm(false);   // إخفاء نموذج الاتصال
          setshowTimetablevide(false);
   
        } else {

          setShowTimetable(false); // إظهار الجدول
          setShowMap(false);            // إظهار الخريطة
          setShowStudentInfo(false);    // إخفاء معلومات الطالب الشخصية
          setShowContactForm(false);
          setshowTimetablevide(true);
          console.error("خطأ في جلب البيانات");
        }
      })
      .catch((error) => {
        console.error("خطأ في الاتصال بالخادم:", error);
      });
  };

  useEffect(() => {
    const idFromState = location.state?.studentId;
    const idFromStorage = localStorage.getItem("studentId");

    if (idFromState) {
      setStudentId(idFromState);
      localStorage.setItem("studentId", idFromState);
      setLoading(false);
    } else if (idFromStorage) {
      setStudentId(idFromStorage);
      setLoading(false);
    } else {
      navigate("/App");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (studentId) {
      axios
        .get(`http://localhost/universityapp/get-student-info.php?id=${studentId}`)
        .then((response) => {
          if (response.data.nom && response.data.prenom && response.data.lnais && response.data.dnais && response.data.nomdep && response.data.nomspc && response.data.nomcycle && response.data.niveau && response.data.groupe) {
            setStudentInfo({
              nom: response.data.nom,
              prenom: response.data.prenom,
              lnais: response.data.lnais,
              dnais: response.data.dnais,
              nomdep: response.data.nomdep,
              nomspc: response.data.nomspc,
              nomcycle: response.data.nomcycle,
              niveau: response.data.niveau,
              groupe: response.data.groupe,
            });
            setLoading(false); // عند تحميل البيانات، نقوم بتغيير حالة الـ loading
          } else {
            console.error("خطأ: لم يتم العثور على بيانات الطالب");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("خطأ في الاتصال بالخادم:", error);
          setLoading(false);
        });
    }
  }, [studentId]);

  if (loading) {
    return <div>جاري تحميل البيانات...</div>; // يمكنك وضع شاشة تحميل هنا
  }

  return (
    <div className="container mx-auto p-4 mt-10">
      <div className="fixed top-4 left-4 z-50">
     <button
      onClick={() => {
      localStorage.removeItem("studentId");
      navigate("/");
      }}
     className="text-red-500 hover:text-red-700 text-2xl"
     title="تسجيل الخروج"
    >
    <FaSignOutAlt />
  </button>
   </div>

      <motion.h1
        className="text-xl font-semibold mb-7 text-right"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
      >
        مرحبًا بك عزيزي الطالب: {studentInfo.nom} {studentInfo.prenom}
      </motion.h1>

      {/* Dashboard Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Email Icon */}
        <div
          className="bg-blue-500 p-4 rounded-lg text-white flex flex-col items-center justify-center cursor-pointer"
          onClick={handleContactClick}  // تأكد من أن onClick في JSX صحيح
        >
          <FaEnvelope className="text-4xl mb-2" />
          <p className="text-center">إتصل بنا</p>
        </div>

        {/* Map Icon */}
        <div
          className="bg-green-500 p-4 rounded-lg text-white flex flex-col items-center justify-center cursor-pointer"
          onClick={handleMapClick}  // تأكد من أن onClick في JSX صحيح
        >
          <FaMapMarkerAlt className="text-4xl mb-2" />
          <p className="text-center">الموقع الجغرافي</p>
        </div>

        {/* Timetable Icon */}
        <div
          className="bg-purple-500 p-4 rounded-lg text-white flex flex-col items-center justify-center cursor-pointer"
          onClick={fetchTimetable}
        >
          <FaClock className="text-4xl mb-2" />
          <p className="text-center">جدول إستعمال الزمن</p>
        </div>

        {/* Student Info Icon */}
        <div
  className="bg-yellow-500 p-4 rounded-lg text-white flex flex-col items-center justify-center cursor-pointer"
  onClick={() => {
    setShowStudentInfo(true); 
    setShowMap(false);
    setShowContactForm(false);
    setShowTimetable(false);    // إخفاء إستعمال الزمن
    setshowTimetablevide(false);
  }}
>
  <FaUser className="text-4xl mb-2" />
  <p className="text-center">معلوماتي الشخصية</p>
</div>


      </div>

      {/* عرض الخريطة إذا كانت حالة showMap true */}
      {showMap && (
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=35.706379780843605,0.5780292399849394&hl=es;z=14&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      )}

      {/* عرض نموذج الاتصال إذا كانت حالة showContactForm true */}
      {showContactForm && (
        <motion.div
          className="mt-8 p-6 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              value={`اللقب و الإسم: ${studentInfo.nom} ${studentInfo.prenom}`}
              readOnly
              className="border border-gray-300 p-2 rounded bg-gray-100 text-gray-700 text-right"
            />
            <input
              type="email"
              placeholder="يرجى حجز بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded text-right"
              required
            />
            <textarea
              placeholder="رسالتك"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 p-2 rounded h-32 text-right"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              إرسال
            </button>
          </form>
        </motion.div>
      )}

      {/* عرض معلومات الطالب showStudentInfo true */}
      
      {showStudentInfo && (
  <motion.div
    className="mt-8 p-6 bg-white rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    
    <div className="overflow-x-auto">
      <table dir="rtl" className="min-w-full border border-gray-300 text-right">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b">المعلومة</th>
            <th className="py-2 px-4 border-b">المحتوى</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">رمز الطالب</td>
            <td className="py-2 px-4 border-b">{studentId || '---'}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">اللقب</td>
            <td className="py-2 px-4 border-b">{studentInfo.nom || '---'}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">الإسم</td>
            <td className="py-2 px-4 border-b">{studentInfo.prenom || '---'}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">تاريخ الميلاد</td>
            <td className="py-2 px-4 border-b">{studentInfo.dnais || '---'}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">مكان الميلاد</td>
            <td className="py-2 px-4 border-b">{studentInfo.lnais || '---'}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">المعهد</td>
            <td className="py-2 px-4 border-b">{studentInfo.nomdep || '---'}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">التخصص</td>
            <td className="py-2 px-4 border-b">{studentInfo.nomspc || '---'}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">الدورة</td>
            <td className="py-2 px-4 border-b">{studentInfo.nomcycle || '---'}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">المستوى</td>
            <td className="py-2 px-4 border-b">    {(() => { switch (studentInfo.niveau) {
            case "1":
            return 'الأولى';
            case "2":
            return 'الثانية';
            case "3":
            return 'الثالثة';
            default:
            return '---' } })()}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">الفوج</td>
            <td className="py-2 px-4 border-b">{studentInfo.groupe || '---'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </motion.div>
)}

      {/* عرض جدول إستعمال الزمن */}
      {showTimetable && emploiData && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">

          <table dir="rtl" className="min-w-full border border-gray-400 text-center border-collapse">
  <thead className="bg-gray-200">
    <tr>
      <th className="py-4 px-4 border-l-2 border-gray-400">اليوم</th>
      <th className="py-4 px-4 border-l-2 border-gray-400">08:30 - 10:00</th>
      <th className="py-4 px-4 border-l-2 border-gray-400">10:00 - 11:30</th>
      <th className="py-4 px-4 border-l-2 border-gray-400">11:30 - 13:00</th>
      <th className="py-4 px-4 border-l-2 border-gray-400">13:30 - 15:00</th>
      <th className="py-4 px-4">15:00 - 16:30</th> {/* آخر خلية لا تحتاج حدود */}
    </tr>
  </thead>
  <tbody className="divide-y-2 divide-gray-400">
    {emploiData.map((item, index) => (
      <tr key={index}>
        <td className="py-4 px-4 border-l-2 border-gray-400">{item.day}</td>
        <td className="py-4 px-4 border-l-2 border-gray-400">{item["08:30-10:00"]}</td>
        <td className="py-4 px-4 border-l-2 border-gray-400">{item["10:00-11:30"]}</td>
        <td className="py-4 px-4 border-l-2 border-gray-400">{item["11:30-13:00"]}</td>
        <td className="py-4 px-4 border-l-2 border-gray-400">{item["13:30-15:00"]}</td>
        <td className="py-4 px-4">{item["15:00-16:30"]}</td> {/* آخر خلية بدون حدود */}
      </tr>
    ))}
  </tbody>
</table>

        </div>
      )}

      {/* عرض جدول إستعمال الزمن في حالة كان فارغ */}
      {showTimetablevide && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center"> جدول إستعمال الزمن غير محجوز الرجاء إتصال بإدارة المعهد </h2>
        </div>
      )}

    </div>
  );
}
