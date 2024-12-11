import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "antd";

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Content style={{ padding: "0 50px", marginTop: 64, backgroundColor: "rgb(224 171 67)" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
