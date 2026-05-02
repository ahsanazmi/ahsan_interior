import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/home-wallpaper-designs")({
  component: HomeWallpaperDesignsPage,
});

function HomeWallpaperDesignsPage() {
  return <DesignIdeaCategoryContent slug="home-wallpaper-designs" />;
}
