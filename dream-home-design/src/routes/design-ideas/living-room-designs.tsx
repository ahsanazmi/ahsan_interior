import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/living-room-designs")({
  component: LivingRoomDesignsPage,
});

function LivingRoomDesignsPage() {
  return <DesignIdeaCategoryContent slug="living-room-designs" />;
}
