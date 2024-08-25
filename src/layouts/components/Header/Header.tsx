import { useAuthStore } from "@/store/authStore";
import { ActionIcon, Button } from "@mantine/core";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Header() {
  const { reset } = useAuthStore();

  return (
    <header className="sticky top-0 right-0">
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-x-4">
          <Link to="/">
            <img src="/logo.png" className="w-16 h-16" />
          </Link>
        </div>
        <div className="flex gap-x-4">
          <Button variant="subtle" color="red.4" onClick={() => reset()}>
            Đăng xuất
          </Button>
          <ActionIcon size="lg" variant="light">
            <IoMenu size={24} />
          </ActionIcon>
        </div>
      </div>
    </header>
  );
}
