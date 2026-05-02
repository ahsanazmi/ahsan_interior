import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/door-designs")({
  component: DoorDesignsPage,
});

function DoorDesignsPage() {
  return <DesignIdeaCategoryContent slug="door-designs" />;
}
