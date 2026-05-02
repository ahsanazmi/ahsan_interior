import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/tv-unit-designs")({
  component: TvUnitDesignsPage,
});

function TvUnitDesignsPage() {
  return <DesignIdeaCategoryContent slug="tv-unit-designs" />;
}
