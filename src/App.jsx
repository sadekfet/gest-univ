import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// استيراد الصفحات الأخرى
import QrReader from './QrReader';
import AdminPage from './AdminPage';
import StudentDashboard from './StudentDashboard';
import AdminDashboard from './AdminDashboard';
import ScheduleManagement from './ScheduleManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/QrRead" element={<QrReader />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/schedule" element={<ScheduleManagement />} />
      </Routes>
    </Router>
  );
}

// مكون الصفحة الرئيسية
function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (role) => {
    if (role === 'QrRead') {
      navigate('/QrRead');
    } else if (role === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-20">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-full max-w-xl animate-fade-in">
        <div className="space-y-0">
          <h1 className="text-lg font-semibold">الجمهورية الجزائرية الديمقراطية الشعبية</h1>
          <h1 className="text-lg font-semibold">وزارة التعليم العالي والبحث العلمي</h1>
          <h1 className="text-lg font-semibold">جامعة غليزان</h1>
        </div>

        <div className="mt-8 space-y-4">
          <div className="overflow-hidden whitespace-nowrap">
            <h2 className="inline-block text-xl font-bold text-orange-600 animate-marquee pause-on-hover">
              مرحبا بك في الأرضية الرقمية لتسيير الطلبة
            </h2>
          </div>

          <p className="text-gray-600">الرجاء تحديد هويتك</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleNavigation('QrRead')}
              className="bg-blue-500 text-white w-[165px] h-[45px] rounded hover:bg-blue-600 font-normal text-xl tracking-wide shadow font-inter"
            >
              Etudiant
            </button>
            <button
              onClick={() => handleNavigation('admin')}
              className="bg-green-500 text-white w-[165px] h-[45px] rounded hover:bg-green-600 font-normal text-xl tracking-wide shadow font-roboto"
            >
              Administrateur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
