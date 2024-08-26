import Error from "@/components/Error";
import ScrollToTop from "@/components/ScrollToTop";
import { CreateCenter, ManageCenter, UpdateCenter, ViewCenter } from "@/features/center/routes";
import { CreateCourt, UpdateCourt, ViewCourt } from "@/features/court/routes";
import { Dashboard } from "@/features/dashboard/routes";
import DefaultLayout from "@/layouts/DefaultLayout";
import AuthProvider from "@/providers/AuthProvider";
import { Navigate, Route, Routes } from "react-router-dom";

export default function AppRoute() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" index element={<Navigate to={"/login"} />} />
        <Route path="dashboard" element={<DefaultLayout />}>
          <Route path="" index element={<Dashboard />} />
          <Route path="center">
            {/* Route /dashboard/center */}
            <Route path="" element={<ManageCenter />} />

            <Route path=":centerId">
              {/* Route /dashboard/center/1 */}
              <Route path="" index element={<ViewCenter />} />

              <Route path="court">
                <Route path=":courtId">
                  {/* Route /dashboard/center/1/court/1 */}
                  <Route path="" index element={<ViewCourt />} />

                  {/* Route /dashboard/center/1/court/1/update */}
                  <Route path="update" element={<UpdateCourt />} />
                </Route>

                {/* Route /dashboard/center/1/court/create */}
                <Route path="create" element={<CreateCourt />} />
              </Route>

              {/* Route /dashboard/center/1/update */}
              <Route path="update" element={<UpdateCenter />} />
            </Route>

            {/* Route /dashboard/center/create */}
            <Route path="create" element={<CreateCenter />} />
          </Route>
          <Route path="payment" element={<Dashboard />} />
          <Route path="booking" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthProvider>
  );
}
