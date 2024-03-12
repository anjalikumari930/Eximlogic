import React, { useEffect, useState } from "react";
import { AiFillPieChart } from "react-icons/ai";
import { TfiAgenda } from "react-icons/tfi";
import { VscRequestChanges } from "react-icons/vsc";
import { GrProjects } from "react-icons/gr";
import Navbar from "../navbar/Nabvar";
import { IoPeopleSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData && authData.user) {
      setUser(authData.user);
    } else {
      console.error("User data not found in localStorage");
    }
  }, []);

  const isAdmin = () => {
    return user && user.role === "admin";
  };

  const Menus = [
    { title: "Dashboard", path: "/admin/dashboard", src: <AiFillPieChart /> },
    { title: "Users", path: "/admin/users", src: <TfiAgenda /> },
    {
      title: "Customers",
      path: "/admin/customers",
      src: <ImProfile />,
    },
    { title: "OS Projects", path: "/admin/projects", src: <GrProjects /> },
    {
      title: "Administration",
      children: [
        { title: "Add User", path: "/admin/add-user" },
        { title: "Add Customer", path: "/admin/add-customer" },
      ],
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
    {
      title: "Customers",
      path: "/user/customers",
      src: <ImProfile />,
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-50 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "" : "-translate-x-full"
        } bg-blue-600 border-r border-gray-200 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-blue-600 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {isAdmin()
              ? Menus.map((menu, index) => (
                  <li key={index}>
                    {menu.children ? (
                      <>
                        <button
                          onClick={toggleDropdown}
                          className="flex items-center justify-between w-full p-2 text-gray-50 rounded-lg dark:text-white group hover:bg-gray-100 hover:text-black hover:font-bold"
                        >
                          <div className="flex items-center">
                            {menu.src}
                            <span className="ms-2">{menu.title}</span>
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transform ${
                              isDropdownOpen ? "rotate-90" : ""
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {isDropdownOpen && (
                          <ul className="pl-4">
                            {menu.children.map((child, idx) => (
                              <li key={idx}>
                                <a
                                  href={child.path}
                                  className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black group"
                                >
                                  {child.src}
                                  <span className="ms-2">{child.title}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <a
                        href={menu.path}
                        className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black group hover:font-bold"
                      >
                        {menu.src}
                        <span className="ms-2">{menu.title}</span>
                      </a>
                    )}
                  </li>
                ))
              : EmployeeMenus.map((menu, index) => (
                  <li key={index}>
                    <a
                      href={menu.path}
                      className="flex items-center p-2 text-gray-50 rounded-lg dark:text-white hover:bg-gray-100 hover:text-black group"
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
