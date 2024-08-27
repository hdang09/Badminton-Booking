import { Table as MantineTable } from "@mantine/core";

export default function CustomTable({ headers, rows }: { headers: string[]; rows: JSX.Element[] }) {
  return (
    <MantineTable verticalSpacing="lg" striped>
      <MantineTable.Thead>
        <MantineTable.Tr>
          {headers.map((header) => (
            <MantineTable.Th key={header}>{header}</MantineTable.Th>
          ))}
        </MantineTable.Tr>
      </MantineTable.Thead>
      <MantineTable.Tbody>{rows}</MantineTable.Tbody>
    </MantineTable>
  );
}
