import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/space-saving-designs")({
  component: SpaceSavingDesignsPage,
});

function SpaceSavingDesignsPage() {
  return <DesignIdeaCategoryContent slug="space-saving-designs" />;
}
