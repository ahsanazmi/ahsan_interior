import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/window-designs")({
  component: WindowDesignsPage,
});

function WindowDesignsPage() {
  return <DesignIdeaCategoryContent slug="window-designs" />;
}
