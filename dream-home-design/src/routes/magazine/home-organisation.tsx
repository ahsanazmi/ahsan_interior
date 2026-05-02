import { createFileRoute } from "@tanstack/react-router";
import { MagazineCategoryContent } from "./$slug";

export const Route = createFileRoute("/magazine/home-organisation")({
  component: HomeOrganisationPage,
});

function HomeOrganisationPage() {
  return <MagazineCategoryContent slug="home-organisation" />;
}
