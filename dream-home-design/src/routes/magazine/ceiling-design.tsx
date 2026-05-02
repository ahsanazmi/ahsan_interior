import { createFileRoute } from "@tanstack/react-router";
import { MagazineCategoryContent } from "./$slug";

export const Route = createFileRoute("/magazine/ceiling-design")({
  component: CeilingDesignPage,
});

function CeilingDesignPage() {
  return <MagazineCategoryContent slug="ceiling-design" />;
}
