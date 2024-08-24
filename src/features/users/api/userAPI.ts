import * as httpAuth from "@/libs/axios-auth";

import { IUser } from "../types";
import { useMutation } from "@tanstack/react-query";

export const getUser = async (): Promise<IUser> => {
  try {
    const resUser = await httpAuth.get(`/users/profile`);
    return resUser;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const useGetUserMutation = (
  handleFn: {
    onError?: (error: Error, variables: unknown, context: unknown) => void;
    onSuccess?: (data: IUser, variables: unknown, context: unknown) => void;
    onMutate?: () => Promise<IUser>;
  },
  retry?: number,
) => {
  return useMutation({
    mutationKey: ["userProfile"],
    mutationFn: getUser,
    onError: handleFn.onError,
    onSuccess: handleFn.onSuccess,
    onMutate: handleFn.onMutate,
    retry,
  });
};
