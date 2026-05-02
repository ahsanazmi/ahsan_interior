import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/balcony-designs")({
  component: BalconyDesignsPage,
});

function BalconyDesignsPage() {
  return <DesignIdeaCategoryContent slug="balcony-designs" />;
}
