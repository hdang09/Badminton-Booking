import { Text, Button, Grid, Container, Flex } from "@mantine/core";
import { IoIosAdd } from "react-icons/io";

import { useGetListCategory } from "../api";
import { Center } from "../types";
import CenterCard from "../components/CenterCard";

export default function ManageCenter() {
  const { data: centers } = useGetListCategory();

  return (
    <Container size="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Text className="text-2xl font-bold">Quản lý trung tâm</Text>
        <Button
          component="a"
          href="/dashboard/center/create"
          radius="md"
          leftSection={<IoIosAdd size={24} />}
        >
          Tạo trung tâm mới
        </Button>
      </Flex>

      <Grid>
        {centers?.map((center: Center) => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={center.id}>
            <CenterCard center={center} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
