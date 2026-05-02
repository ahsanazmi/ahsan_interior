import { createFileRoute } from "@tanstack/react-router";
import { MagazineCategoryContent } from "./$slug";

export const Route = createFileRoute("/magazine/vastu-tips")({
  component: VastuTipsPage,
});

function VastuTipsPage() {
  return <MagazineCategoryContent slug="vastu-tips" />;
}
