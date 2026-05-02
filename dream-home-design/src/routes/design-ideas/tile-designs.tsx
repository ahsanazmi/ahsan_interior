import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/tile-designs")({
  component: TileDesignsPage,
});

function TileDesignsPage() {
  return <DesignIdeaCategoryContent slug="tile-designs" />;
}
