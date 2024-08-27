import { Card, Image, Text } from "@mantine/core";
import { numberToPrice } from "@/libs/helper";

import { Court } from "../../types";
import { Link } from "react-router-dom";

export default function CourtCard({ court, centerId }: { court: Court; centerId: string }) {
  return (
    <Card
      shadow="sm"
      padding="xl"
      component={Link}
      to={`/dashboard/center/${centerId}/court/${court.id}`}
    >
      <Card.Section>
        <Image src={court.image} h={160} alt={court.courtName} />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {court.courtName}
      </Text>

      <Text mt="xs" c="dimmed" size="sm">
        {numberToPrice(court.pricePerSlot)}/slot
      </Text>
    </Card>
  );
}
