import { Center } from "@/features/center/types";
import { Input, Combobox, useCombobox, TextInput } from "@mantine/core";
import { useState } from "react";

export default function Dropdown({ centers }: { centers: Center[] }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = centers?.map((item) => (
    <Combobox.Option value={item.courtCenterName} key={item.id}>
      {item.courtCenterName}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <TextInput
          label="Tìm kiếm trung tâm:"
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          className="flex items-center gap-3"
          onClick={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>Nhấn vào đây để tìm kiếm...</Input.Placeholder>}
        </TextInput>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
