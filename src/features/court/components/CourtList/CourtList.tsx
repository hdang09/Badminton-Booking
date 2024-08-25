import { useGetListCategory } from "@/features/center/api";
import CenterCard from "@/features/center/components/CenterCard";
import { Center } from "@/features/center/types";
import { Grid } from "@mantine/core";

export default function CourtList() {
  const { data: centers } = useGetListCategory();
  return (
    <Grid>
      {centers?.map((center: Center) => (
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={center.id}>
          <CenterCard center={center} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
