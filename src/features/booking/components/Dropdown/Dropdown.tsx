import { useGetListCenter } from "@/features/center/api";
import { useGetListCourt } from "@/features/court/api";
import { Input, Combobox, useCombobox, TextInput } from "@mantine/core";
import { useState } from "react";

export default function Dropdown({ courtId, setCourtId }: { courtId: string; setCourtId: any }) {
  const { data: centers } = useGetListCenter();
  const centerCombobox = useCombobox({
    onDropdownClose: () => centerCombobox.resetSelectedOption(),
  });
  const centerOptions = centers?.map((item) => (
    <Combobox.Option value={item.id.toString()} key={item.id}>
      {item.courtCenterName}
    </Combobox.Option>
  ));
  const [centerId, setCenterId] = useState<string | null>(null);

  const { data: courts } = useGetListCourt(centerId ?? "");
  const courtCombobox = useCombobox({
    onDropdownClose: () => courtCombobox.resetSelectedOption(),
  });
  const courtOptions = courts?.map((item) => (
    <Combobox.Option value={item.id.toString()} key={item.id}>
      {item.courtName}
    </Combobox.Option>
  ));

  return (
    <div className="flex gap-3">
      <Combobox
        store={centerCombobox}
        onOptionSubmit={(val) => {
          setCenterId(val);
          centerCombobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <TextInput
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => centerCombobox.toggleDropdown()}
            className="min-w-[150px]"
          >
            {centerId ? (
              centers?.find((x) => x.id.toString() === centerId)?.courtCenterName
            ) : (
              <Input.Placeholder>Tìm kiếm trung tâm</Input.Placeholder>
            )}
          </TextInput>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>{centerOptions}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      <Combobox
        store={courtCombobox}
        onOptionSubmit={(val) => {
          setCourtId(val);
          courtCombobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <TextInput
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => courtCombobox.toggleDropdown()}
            disabled={!centerId}
            className="min-w-[150px]"
          >
            {courtId ? (
              courts?.find((x) => x.id.toString() === courtId)?.courtName
            ) : (
              <Input.Placeholder>Tìm kiếm sân</Input.Placeholder>
            )}
          </TextInput>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>{courtOptions}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
