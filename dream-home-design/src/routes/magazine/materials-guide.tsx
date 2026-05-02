import { createFileRoute } from "@tanstack/react-router";
import { MagazineCategoryContent } from "./$slug";

export const Route = createFileRoute("/magazine/materials-guide")({
  component: MaterialsGuidePage,
});

function MaterialsGuidePage() {
  return <MagazineCategoryContent slug="materials-guide" />;
}
