import { createFileRoute } from "@tanstack/react-router";
import { MagazineCategoryContent } from "./$slug";

export const Route = createFileRoute("/magazine/wall-design-ideas")({
  component: WallDesignIdeasPage,
});

function WallDesignIdeasPage() {
  return <MagazineCategoryContent slug="wall-design-ideas" />;
}
