import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/staircase-designs")({
  component: StaircaseDesignsPage,
});

function StaircaseDesignsPage() {
  return <DesignIdeaCategoryContent slug="staircase-designs" />;
}
