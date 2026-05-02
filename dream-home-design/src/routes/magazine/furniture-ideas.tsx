import { createFileRoute } from "@tanstack/react-router";
import { MagazineCategoryContent } from "./$slug";

export const Route = createFileRoute("/magazine/furniture-ideas")({
  component: FurnitureIdeasPage,
});

function FurnitureIdeasPage() {
  return <MagazineCategoryContent slug="furniture-ideas" />;
}
