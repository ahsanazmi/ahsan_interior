import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/dining-room-designs")({
  component: DiningRoomDesignsPage,
});

function DiningRoomDesignsPage() {
  return <DesignIdeaCategoryContent slug="dining-room-designs" />;
}
