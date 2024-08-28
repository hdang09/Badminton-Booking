import { Image, Text, Button, Group, Card } from "@mantine/core";
import { Center } from "../../types";
import { Link } from "react-router-dom";

export default function CenterCard({ center }: { center: Center }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={center.image}
          height={160}
          alt={center.courtCenterName}
          fallbackSrc="https://i.imgur.com/JsNxV4r.jpeg"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text mih="50px" fw={500}>
          {center.courtCenterName}
        </Text>
      </Group>

      <Text size="sm" c="dimmed" mih="50px">
        {center.address}
      </Text>

      <Button component={Link} to={`/dashboard/center/${center.id}`} fullWidth mt="md" radius="md">
        Xem trung tâm này
      </Button>
    </Card>
  );
}
