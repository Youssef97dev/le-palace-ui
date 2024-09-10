import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Icons
import { MdDashboard } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { TbPicnicTable } from "react-icons/tb";
import { IoPersonSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

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
        icon: <TbPicnicTable size={18} />,
        label: "Tables",
        href: "/admin/table",
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

const Menu = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/signin");
  };

  return (
    <div className="mt-4 text-sm ">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block font-bold my-4">{i.title}</span>
          {i.items.map((item) => {
            return (
              <>
                {item.label !== "Logout" ? (
                  <Link
                    href={item.href}
                    key={item.label}
                    className="flex font-semibold items-center justify-center lg:justify-start gap-4  py-2 md:px-2 rounded-md hover:bg-[#ebebeb]"
                  >
                    {item.icon}
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
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
              </>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
