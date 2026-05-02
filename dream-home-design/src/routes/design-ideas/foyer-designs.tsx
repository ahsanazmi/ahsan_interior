import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/foyer-designs")({
  component: FoyerDesignsPage,
});

function FoyerDesignsPage() {
  return <DesignIdeaCategoryContent slug="foyer-designs" />;
}
