import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/kids-bedroom-designs")({
  component: KidsBedroomDesignsPage,
});

function KidsBedroomDesignsPage() {
  return <DesignIdeaCategoryContent slug="kids-bedroom-designs" />;
}
