import { createFileRoute } from "@tanstack/react-router";
import { MagazineCategoryContent } from "./$slug";

export const Route = createFileRoute("/magazine/expert-advice")({
  component: ExpertAdvicePage,
});

function ExpertAdvicePage() {
  return <MagazineCategoryContent slug="expert-advice" />;
}
