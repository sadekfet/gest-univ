import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/universityapp/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          iduser: username,
          motpass: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('تم تسجيل الدخول بنجاح 🎉'); 
       navigate('/admin-dashboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('حدث خطأ أثناء تسجيل الدخول:', error);
      alert('حدث خطأ في الاتصال بالسيرفر');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center animate-fade-in">
        {/* الرسالة المتحركة */}
        <div className="overflow-hidden whitespace-nowrap mb-8">
          <h2 className="inline-block text-2xl font-bold text-orange-600 animate-marquee pause-on-hover">
            مرحبا بك في الأرضية الرقمية لتسيير الطلبة
          </h2>
        </div>

        {/* النموذج */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-right"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-right"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-[48%] bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-semibold"
            >
              تسجيل الدخول
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-[48%] bg-red-500 text-white py-2 rounded-lg hover:bg-gray-500 font-semibold"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
