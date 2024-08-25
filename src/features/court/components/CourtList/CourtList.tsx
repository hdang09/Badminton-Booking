import { Grid } from "@mantine/core";
import { useParams } from "react-router";

import { useGetListCourt } from "../../api";
import { Court } from "../../types";
import CourtCard from "../CourtCard";

export default function CourtList() {
  const { centerId } = useParams();
  const { data: courts } = useGetListCourt(centerId ?? "");

  return (
    <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 70 }} overflow="hidden">
      {courts?.map((court: Court) => (
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={court.id}>
          <CourtCard court={court} centerId={centerId ?? ""} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
