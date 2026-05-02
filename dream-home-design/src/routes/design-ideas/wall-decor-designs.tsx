import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/wall-decor-designs")({
  component: WallDecorDesignsPage,
});

function WallDecorDesignsPage() {
  return <DesignIdeaCategoryContent slug="wall-decor-designs" />;
}
