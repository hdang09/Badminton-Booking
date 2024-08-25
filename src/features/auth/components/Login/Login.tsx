import { TextInput, PasswordInput, Checkbox, Anchor, Title, Group, Button } from "@mantine/core";
// import slider from '@/assets/img/sliderHome1.png';
import { useLoginMutation, LoginCredentials } from "@/features/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export default function Login({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const { setAccountType } = useAuthStore();
  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      setAccountType({ user: data.user });
      onLoginSuccess();
    },
    onError: () => {
      toast.error("Đăng nhập thất bại, vui lòng thử lại");
    },
  });
  const { handleSubmit, register } = useForm<LoginCredentials>();

  const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
    loginMutation.mutate(data);
  };
  return (
    <form className="pb-4 px-6" onSubmit={handleSubmit(onSubmit)}>
      <Title ta="center" className="mb-4">
        Chào mừng quay trở lại!
      </Title>
      <TextInput
        {...register("username")}
        label="Tên đăng nhập"
        placeholder="Nhập tên đăng nhập"
        required
      />
      <PasswordInput
        {...register("password")}
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        required
        mt="md"
      />
      <Group justify="space-between" mt="lg">
        <Checkbox label="Remember me" />
        <Anchor component="button" size="sm">
          Forgot password?
        </Anchor>
      </Group>
      <Button type="submit" fullWidth mt="xl" loading={loginMutation.isPending}>
        Đăng nhập
      </Button>
    </form>
  );
}
