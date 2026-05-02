import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/home-office-designs")({
  component: HomeOfficeDesignsPage,
});

function HomeOfficeDesignsPage() {
  return <DesignIdeaCategoryContent slug="home-office-designs" />;
}
