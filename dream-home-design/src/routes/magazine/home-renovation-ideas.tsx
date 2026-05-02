import { createFileRoute } from "@tanstack/react-router";
import { MagazineCategoryContent } from "./$slug";

export const Route = createFileRoute("/magazine/home-renovation-ideas")({
  component: HomeRenovationIdeasPage,
});

function HomeRenovationIdeasPage() {
  return <MagazineCategoryContent slug="home-renovation-ideas" />;
}
