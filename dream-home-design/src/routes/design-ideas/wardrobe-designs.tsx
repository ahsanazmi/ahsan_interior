import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/wardrobe-designs")({
  component: WardrobeDesignsPage,
});

function WardrobeDesignsPage() {
  return <DesignIdeaCategoryContent slug="wardrobe-designs" />;
}
