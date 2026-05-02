import { createFileRoute } from "@tanstack/react-router";
import { MagazineCategoryContent } from "./$slug";

export const Route = createFileRoute("/magazine/commercial-interiors")({
  component: CommercialInteriorsPage,
});

function CommercialInteriorsPage() {
  return <MagazineCategoryContent slug="commercial-interiors" />;
}
