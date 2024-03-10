import React from "react";
import { AiFillPieChart } from "react-icons/ai";
import { TfiAgenda } from "react-icons/tfi";
import { VscRequestChanges } from "react-icons/vsc";
import { GrProjects} from "react-icons/gr";
import Navbar from "../navbar/Nabvar";
import { IoPeopleSharp } from "react-icons/io5";

//main sidebar
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";

  const Menus = [
    {
      title: "Dashboard",
      path: isAdmin ? "/admin/dashboard" : "/user/dashboard",
      src: <AiFillPieChart />,
    },
    { title: "Users", path: "/admin/users", src: <TfiAgenda /> },
    {
      title: "Project Requests",
      path: isAdmin ? "/admin/requests" : "/user/osrequests",
      src: <VscRequestChanges />,
    },
    { title: "OS Projects", path: "/admin/projects", src: <GrProjects /> },
    
    {
      title: "Contributors",
      path: "/admin/contributors",
      src: <IoPeopleSharp />,
    },
  ];

  const EmployeeMenus = [
    { title: "Dashboard", path: "/user/dashboard", src: <AiFillPieChart /> },
    {
      title: "Project Requests",
      path: "/user/osrequests",
      src: <VscRequestChanges />,
    },
    { title: "OS Projects", path: "/user/osprojects", src: <GrProjects /> },
    
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <Navbar
        isDropdownOpen={isDropdownOpen}
        toggleSidebar={toggleSidebar}
        toggleDropdown={toggleDropdown}
      />
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-50 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "" : "-translate-x-full"
        } bg-purple border-r border-gray-200 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-purple dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {isAdmin
              ? Menus.map((menu, index) => (
                  <li key={index}>
                    <a
                      href={menu.path}
                      className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white  hover:bg-gray-100  group hover:font-bold"
                    >
                      {menu.src}
                      <span className="ms-2">{menu.title}</span>
                    </a>
                  </li>
                ))
              : EmployeeMenus.map((menu, index) => (
                  <li key={index}>
                    <a
                      href={menu.path}
                      className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-gray-100  group"
                    >
                      {menu.src}
                      <span className="ms-2">{menu.title}</span>
                    </a>
                  </li>
                ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;