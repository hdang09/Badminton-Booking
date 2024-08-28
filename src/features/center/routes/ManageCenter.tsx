import { Text, Button, Grid, Container, Flex } from "@mantine/core";
import { IoIosAdd } from "react-icons/io";

import { useGetListCenter } from "../api";
import { Center } from "../types";
import CenterCard from "../components/CenterCard";
import { Link } from "react-router-dom";

export default function ManageCenter() {
  const { data: centers } = useGetListCenter();

  return (
    <Container size="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Text className="text-2xl font-bold">Quản lý trung tâm</Text>
        <Button
          component={Link}
          to="/dashboard/center/create"
          radius="md"
          leftSection={<IoIosAdd size={24} />}
        >
          Tạo trung tâm mới
        </Button>
      </Flex>

      <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
        {centers?.map((center: Center) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={center.id}>
            <CenterCard center={center} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
