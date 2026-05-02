import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/false-ceiling-designs")({
  component: FalseCeilingDesignsPage,
});

function FalseCeilingDesignsPage() {
  return <DesignIdeaCategoryContent slug="false-ceiling-designs" />;
}
