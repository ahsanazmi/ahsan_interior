import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/flooring-designs")({
  component: FlooringDesignsPage,
});

function FlooringDesignsPage() {
  return <DesignIdeaCategoryContent slug="flooring-designs" />;
}
