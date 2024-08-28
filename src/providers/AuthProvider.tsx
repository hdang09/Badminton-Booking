// import { useGetUserMutation } from "@/features/users";
// import { useAuthStore } from "@/store/authStore";
// import { useEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // const { setAccountType, reset } = useAuthStore();

  // const getUserProfile = useGetUserMutation({
  //   onError: () => {
  //     reset();
  //   },
  //   onSuccess: (data) => {
  //     setAccountType(data);
  //   },
  // });

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     getUserProfile.mutate({});
  //   } else {
  //     reset();
  //   }
  // }, []);

  return children;
}
