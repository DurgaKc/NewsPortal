import Navbar from "../Components/Admin/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
