import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/kitchen-designs")({
  component: KitchenDesignsPage,
});

function KitchenDesignsPage() {
  return <DesignIdeaCategoryContent slug="kitchen-designs" />;
}
