import Error from "@/components/Error";
import ScrollToTop from "@/components/ScrollToTop";
import { CreateCenter, ManageCenter, UpdateCenter, ViewCenter } from "@/features/center/routes";
import Dashboard from "@/features/owner/components/Dashboard";
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthProvider from "@/providers/AuthProvider";
import { Navigate, Route, Routes } from "react-router-dom";

export default function AppRoute() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" index element={<Navigate to={"/login"} />} />
        <Route path="/dashboard" element={<DefaultLayout />}>
          <Route path="" index element={<Dashboard />} />
          <Route path="center">
            <Route path="" element={<ManageCenter />} />
            <Route path=":centerId" element={<ViewCenter />} />
            <Route path="create" element={<CreateCenter />} />
            <Route path="update/:centerId" element={<UpdateCenter />} />
          </Route>
          <Route path="payment" element={<Dashboard />} />
          <Route path="booking" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthProvider>
  );
}
