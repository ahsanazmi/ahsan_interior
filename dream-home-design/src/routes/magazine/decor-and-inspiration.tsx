import { createFileRoute } from "@tanstack/react-router";
import { MagazineCategoryContent } from "./$slug";

export const Route = createFileRoute("/magazine/decor-and-inspiration")({
  component: DecorAndInspirationPage,
});

function DecorAndInspirationPage() {
  return <MagazineCategoryContent slug="decor-and-inspiration" />;
}
