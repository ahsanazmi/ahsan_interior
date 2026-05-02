import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/kitchen-sinks")({
  component: KitchenSinksPage,
});

function KitchenSinksPage() {
  return <DesignIdeaCategoryContent slug="kitchen-sinks" />;
}
