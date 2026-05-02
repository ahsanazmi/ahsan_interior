import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/wall-paint-designs")({
  component: WallPaintDesignsPage,
});

function WallPaintDesignsPage() {
  return <DesignIdeaCategoryContent slug="wall-paint-designs" />;
}
