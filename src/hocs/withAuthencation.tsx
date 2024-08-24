import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const WithAuthencation = ({ children }: { children: React.ReactNode }) => {
  const { reset, accountType } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const roleId = accountType?.role?.id;

  useEffect(() => {
    if (!token || token.length === 0) {
      reset();
      navigate("/login", { replace: true });
    } else navigate("/dashboard", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, token, roleId]);

  return <>{token && token.length > 0 && children}</>;
};

export default WithAuthencation;
