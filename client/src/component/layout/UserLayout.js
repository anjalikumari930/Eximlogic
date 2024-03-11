import Sidebar from "../sidebar/Sidebar";
import { Toaster, ToastBar } from "react-hot-toast";

const UserLayout = ({ children }) => {
  return (
    <div className="relative">
      <div className="relative flex h-screen overflow-hidden">
        <div className="absolute left-0 h-full z-20">
          <Sidebar />
        </div>
        <div className="flex-grow z-0 w-screen">
          <div className="mt-5 m-5">
            {children}
            <Toaster position="bottom-right" reverseOrder={false}>
              {(t) => (
                <ToastBar
                  toast={t}
                  style={{
                    ...t.style,
                    animation: t.visible
                      ? "custom-enter 1s ease"
                      : "custom-exit 1s ease",
                  }}
                />
              )}
            </Toaster>
            ;
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
