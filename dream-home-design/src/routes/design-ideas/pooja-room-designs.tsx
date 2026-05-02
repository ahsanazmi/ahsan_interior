import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/pooja-room-designs")({
  component: PoojaRoomDesignsPage,
});

function PoojaRoomDesignsPage() {
  return <DesignIdeaCategoryContent slug="pooja-room-designs" />;
}
