"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { userAppStore } from "@/store/store";

// Icons
import { MdDashboard } from "react-icons/md";
import { FaBookmark, FaUserCog } from "react-icons/fa";
import { TbPicnicTable } from "react-icons/tb";
import { IoPersonSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

const Menu = () => {
  const router = useRouter();

  const { userInfo, setUserInfo }: any = userAppStore();

  const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: <MdDashboard size={18} />,
          label: "Dashboard",
          href: "/admin",
        },
        {
          icon: <FaBookmark size={18} />,
          label: "Reservations",
          href: "/admin/reservation",
        },
        {
          icon: <IoPersonSharp size={18} />,
          label: "Customers",
          href: "/admin/customer",
        },
      ],
    },
    {
      title: "OTHER",
      items: [
        {
          icon: <BiLogOut size={18} />,
          label: "Logout",
          href: "/signin",
        },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/signin");
  };

  return (
    <div className="mt-4 text-sm ">
      {menuItems.map((i, index) => (
        <div className="flex flex-col gap-2" key={index}>
          <span className="hidden lg:block font-bold my-4">{i.title}</span>
          {i.items.map((item, index) => {
            return (
              <div key={index}>
                {item.label !== "Logout" ? (
                  <>
                    <Link
                      href={item.href}
                      key={item.label}
                      className="flex font-semibold items-center justify-center lg:justify-start gap-4  py-2 md:px-2 rounded-md hover:bg-[#ebebeb]"
                    >
                      {item.icon}
                      <span className="hidden lg:block">{item.label}</span>
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    key={item.label}
                    className="flex font-semibold items-center justify-center lg:justify-start gap-4 py-2 md:px-2 rounded-md hover:bg-[#ebebeb]"
                  >
                    {item.icon}
                    <span className="hidden lg:block">{item.label}</span>
                  </button>
                )}
              </div>
            );
          })}
          {userInfo?.username === "julie" && i.title !== "OTHER" && (
            <div>
              <Link
                href="/admin/user"
                className="flex font-semibold items-center justify-center lg:justify-start gap-4  py-2 md:px-2 rounded-md hover:bg-[#ebebeb]"
              >
                <FaUserCog size={18} />
                <span className="hidden lg:block">Users</span>
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
