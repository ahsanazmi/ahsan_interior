import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/bathroom-designs")({
  component: BathroomDesignsPage,
});

function BathroomDesignsPage() {
  return <DesignIdeaCategoryContent slug="bathroom-designs" />;
}
