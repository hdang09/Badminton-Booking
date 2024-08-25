import { Image, Text, Button, Group, Card } from "@mantine/core";
import { Center } from "../../types";

export default function CenterCard({ center }: { center: Center }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={center.image} height={160} alt={center.courtCenterName} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text mih="50px" fw={500}>
          {center.courtCenterName}
        </Text>
        {/* <Badge color="pink">On Sale</Badge> */}
      </Group>

      <Text size="sm" c="dimmed" mih="50px">
        {center.address}
      </Text>

      <Button component="a" href={`/dashboard/center/${center.id}`} fullWidth mt="md" radius="md">
        Xem trung tâm này
      </Button>
    </Card>
  );
}
