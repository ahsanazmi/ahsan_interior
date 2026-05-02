import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/home-bar-designs")({
  component: HomeBarDesignsPage,
});

function HomeBarDesignsPage() {
  return <DesignIdeaCategoryContent slug="home-bar-designs" />;
}
