import { createFileRoute } from "@tanstack/react-router";
import { MagazineCategoryContent } from "./$slug";

export const Route = createFileRoute("/magazine/home-decor")({
  component: HomeDecorPage,
});

function HomeDecorPage() {
  return <MagazineCategoryContent slug="home-decor" />;
}
