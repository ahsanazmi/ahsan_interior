import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/guest-bedroom-designs")({
  component: GuestBedroomDesignsPage,
});

function GuestBedroomDesignsPage() {
  return <DesignIdeaCategoryContent slug="guest-bedroom-designs" />;
}
