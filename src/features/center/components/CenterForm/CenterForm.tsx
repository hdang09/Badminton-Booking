import { useForm } from "@mantine/form";
import { TextInput, Button, Text } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { useCreateCenterMutation, useGetCenter, useUpdateCenterMutation } from "../../api";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { CenterFormProps } from "../../types";
import { AutocompleteAddress } from "@/features/map/components";
import { useSearchLocationStore } from "@/store/componentStore";
import { usePlaceDetailMutation } from "@/features/map/api";

function CenterForm() {
  const navigate = useNavigate();
  const { centerId } = useParams();
  const { data: center } = useGetCenter(centerId ?? "");

  const form = useForm({
    initialValues: {
      courtCenterName: "",
      address: "",
      latitude: "",
      longtitude: "",
      province: "",
      district: "",
      ward: "",
    },

    validate: {
      courtCenterName: (value) => (value ? null : "Tên trung tâm sân là bắt buộc"),
    },
  });

  useEffect(() => {
    if (!center || !centerId) return;

    form.setValues(center);
  }, [centerId, center]);

  const updateCenterMutation = useUpdateCenterMutation({
    onSuccess: () => {
      toast.success("Cập nhật trung tâm thành công");
      navigate("/dashboard/center");
    },
    onError: (e: any) => {
      const error = e.message;
      toast.error(error || "Đã có lỗi xảy ra, vui lòng thử lại sau");
    },
  });

  const createCenterMutation = useCreateCenterMutation({
    onSuccess: () => {
      toast.success("Tạo trung tâm thành công");
      navigate("/dashboard/center");
    },
    onError: (e: any) => {
      const error = e.message;
      toast.error(error || "Đã có lỗi xảy ra, vui lòng thử lại sau");
    },
  });

  const { sessionToken, placeChoose, setSessionToken, setPlaceDetail } = useSearchLocationStore();

  const placeDetailMutation = usePlaceDetailMutation({
    onSuccess: (data) => {
      setPlaceDetail(data);
      setSessionToken();
    },
  });

  const handleSubmit = async (values: CenterFormProps) => {
    const courtOwnerId = localStorage.getItem("ownerId") ?? "1";
    let newValues = { ...values, courtOwnerId: Number.parseInt(courtOwnerId) };

    if (placeChoose && placeChoose.place_id) {
      const placDetail = await placeDetailMutation.mutateAsync({
        placeId: placeChoose.place_id!,
        sessionToken: sessionToken,
      });
      if (placDetail && placDetail.geometry) {
        newValues.latitude = placDetail.geometry.location.lat.toString();
        newValues.longtitude = placDetail.geometry.location.lng.toString();
        newValues.address = placeChoose.description ?? "";
        setSessionToken();
      } else {
        toast.error("Có lỗi xảy ra khi thay đổi địa chỉ, vui lòng thử lại sau");
        return;
      }
    }

    if (centerId) {
      updateCenterMutation.mutate(newValues);
      return;
    }

    createCenterMutation.mutate(newValues);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-50 rounded-lg shadow-lg">
      <Text fw={700} size="xl" c="green" className="text-2xl mb-6">
        {centerId ? "Cập nhật trung tâm" : "Tạo trung tâm"}
      </Text>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2" htmlFor="courtCenterName">
            Tên trung tâm sân
          </label>
          <TextInput
            id="courtCenterName"
            placeholder="Nhập tên trung tâm sân"
            {...form.getInputProps("courtCenterName")}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-2" htmlFor="address">
            Địa chỉ
          </label>
          {/* <TextInput
            id="address"
            disabled={!!centerId}
            placeholder="Nhập địa chỉ"
            {...form.getInputProps("address")}
            className="border border-gray-300 rounded-lg p-2"
          /> */}
          <div className="border-solid border-2 border-gray-200 p-2 rounded-lg">
            <AutocompleteAddress defaultValue={center?.address} disabled={!!centerId} />
          </div>
        </div>

        {/* <div className="flex flex-col">
          <label className="text-gray-700 mb-2" htmlFor="latitude">
            Vĩ độ
          </label>
          <TextInput
            id="latitude"
            disabled={!!centerId}
            placeholder="Nhập vĩ độ"
            {...form.getInputProps("latitude")}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-2" htmlFor="longtitude">
            Kinh độ
          </label>
          <TextInput
            id="longtitude"
            disabled={!!centerId}
            placeholder="Nhập kinh độ"
            {...form.getInputProps("longtitude")}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div> */}

        <div className="flex flex-col">
          <label className="text-gray-700 mb-2" htmlFor="province">
            Tỉnh
          </label>
          <TextInput
            id="province"
            disabled={!!centerId}
            placeholder="Nhập tỉnh"
            {...form.getInputProps("province")}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-2" htmlFor="district">
            Quận/Huyện
          </label>
          <TextInput
            id="district"
            placeholder="Nhập quận/huyện"
            disabled={!!centerId}
            {...form.getInputProps("district")}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-2" htmlFor="ward">
            Phường/Xã
          </label>
          <TextInput
            id="ward"
            placeholder="Nhập phường/xã"
            disabled={!!centerId}
            {...form.getInputProps("ward")}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* TODO: Add Editor here */}

        <div className="col-span-2 flex">
          <Button
            type="submit"
            className="w-1/4 mx-auto text-white py-2 px-4 rounded-lg transition-colors"
          >
            {centerId ? "Cập nhật" : "Tạo"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CenterForm;
