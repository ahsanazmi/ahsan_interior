import { createFileRoute } from "@tanstack/react-router";
import { MagazineCategoryContent } from "./$slug";

export const Route = createFileRoute("/magazine/interior-advice")({
  component: InteriorAdvicePage,
});

function InteriorAdvicePage() {
  return <MagazineCategoryContent slug="interior-advice" />;
}
