import { createFileRoute } from "@tanstack/react-router";
import { MagazineCategoryContent } from "./$slug";

export const Route = createFileRoute("/magazine/lighting-ideas")({
  component: LightingIdeasPage,
});

function LightingIdeasPage() {
  return <MagazineCategoryContent slug="lighting-ideas" />;
}
