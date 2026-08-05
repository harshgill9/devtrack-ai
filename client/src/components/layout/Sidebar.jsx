import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Jobs", path: "/jobs", icon: <FaBriefcase /> },
    { name: "Resumes", path: "/resumes", icon: <FaFileAlt /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        DevTrack AI
      </div>

      <nav className="mt-5">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-3 transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}