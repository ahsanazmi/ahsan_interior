import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/homes-by-nextgen")({
  component: HomesByNextGenPage,
});

function HomesByNextGenPage() {
  return <DesignIdeaCategoryContent slug="homes-by-nextgen" />;
}
