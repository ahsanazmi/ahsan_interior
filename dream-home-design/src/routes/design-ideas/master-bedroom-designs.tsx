import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/master-bedroom-designs")({
  component: MasterBedroomDesignsPage,
});

function MasterBedroomDesignsPage() {
  return <DesignIdeaCategoryContent slug="master-bedroom-designs" />;
}
