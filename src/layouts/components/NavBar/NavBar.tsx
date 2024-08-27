import { Button, Group, ScrollArea } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { VscDashboard } from "react-icons/vsc";
import { MdPayment, MdOutlineCalendarMonth, MdOutlineHome } from "react-icons/md";
import Logout from "@/features/auth/components/Logout";
import { useAuthStore } from "@/store/authStore";

const BUTTONS = [
  { label: "Thống kê", icon: <VscDashboard size="24px" />, path: "/dashboard" },
  { label: "Quản lý trung tâm", icon: <MdOutlineHome size="24px" />, path: "/dashboard/center" },
  { label: "Quản lý thanh toán", icon: <MdPayment size="24px" />, path: "/dashboard/payment" },
  {
    label: "Quản lý đặt sân",
    icon: <MdOutlineCalendarMonth size="24px" />,
    path: "/dashboard/booking",
  },
];

export default function NavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setIsLogout } = useAuthStore();

  return (
    <>
      <ScrollArea>
        <Group gap={16}>
          {BUTTONS.map((button) => (
            <Button
              key={button.label}
              fullWidth
              mih={40}
              variant={pathname === button.path ? "gradient" : "subtle"}
              onClick={() => navigate(button.path)}
              className="flex gap-x-3 justify-start active:transform-none text-base"
              leftSection={button.icon}
            >
              {button.label}
            </Button>
          ))}
        </Group>
      </ScrollArea>
      <Logout
        onSuccess={() => {
          setIsLogout(true);
          navigate("/login");
        }}
      />
    </>
  );
}
