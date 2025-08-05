import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import UploadPage from "./pages/upload/UploadPage";
import ChatPage from "./pages/chatpage/ChatPage";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} /> 
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/" element={<Dashboard />} /> 
     </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
