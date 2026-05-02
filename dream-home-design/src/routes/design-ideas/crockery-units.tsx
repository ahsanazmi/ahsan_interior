import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/crockery-units")({
  component: CrockeryUnitsPage,
});

function CrockeryUnitsPage() {
  return <DesignIdeaCategoryContent slug="crockery-units" />;
}
