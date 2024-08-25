import { useForm } from "@mantine/form";
import { TextInput, NumberInput, Button, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { useCreateCourtMutation, useGetCourt, useUpdateCourtMutation } from "../../api";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { CourtFormProps, CourtReq } from "../../types";

function CourtForm() {
  const navigate = useNavigate();
  const { courtId, centerId } = useParams();
  const { data: court } = useGetCourt(centerId ?? "", courtId ?? "");

  const form = useForm({
    initialValues: {
      courtName: "",
      pricePerSlot: 0,
    },

    validate: {
      courtName: (value) => (value ? null : "Tên sân là bắt buộc"),
      pricePerSlot: (value) => (value > 0 ? null : "Giá mỗi suất phải lớn hơn 0"),
    },
  });

  useEffect(() => {
    if (!court || !courtId) return;

    form.setValues(court);
  }, [courtId, court]);

  const updateCourtMutation = useUpdateCourtMutation({
    onSuccess: () => {
      toast.success("Cập nhật sân thành công");
      navigate(`/dashboard/center/${centerId}/court/${courtId}`);
    },
    onError: (e: any) => {
      const error = e.message;
      toast.error(error || "Đã có lỗi xảy ra, vui lòng thử lại sau");
    },
  });

  const createCourtMutation = useCreateCourtMutation({
    onSuccess: () => {
      toast.success("Tạo sân thành công");
      navigate(`/dashboard/center/${centerId}`);
    },
    onError: (e: any) => {
      const error = e.message;
      toast.error(error || "Đã có lỗi xảy ra, vui lòng thử lại sau");
    },
  });

  const handleSubmit = (values: CourtFormProps) => {
    if (courtId) {
      const newValues = {
        ...values,
        courtCenterId: Number.parseInt(centerId ?? ""),
      };
      updateCourtMutation.mutate(newValues);
      return;
    }

    createCourtMutation.mutate(values as CourtReq);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-50 rounded-lg shadow-lg">
      <Text fw={700} size="xl" c="green" className="text-2xl mb-6">
        {courtId ? "Cập nhật sân" : "Tạo sân"}
      </Text>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2" htmlFor="courtName">
            Tên sân
          </label>
          <TextInput
            id="courtName"
            placeholder="Nhập tên sân"
            {...form.getInputProps("courtName")}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-2" htmlFor="pricePerSlot">
            Giá mỗi suất
          </label>
          <NumberInput
            id="pricePerSlot"
            placeholder="Nhập giá mỗi suất"
            {...form.getInputProps("pricePerSlot")}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="col-span-2 flex">
          <Button
            type="submit"
            className="w-1/4 mx-auto text-white py-2 px-4 rounded-lg transition-colors"
          >
            {courtId ? "Cập nhật" : "Tạo"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CourtForm;
