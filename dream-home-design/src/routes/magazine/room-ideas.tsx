import { createFileRoute } from "@tanstack/react-router";
import { MagazineCategoryContent } from "./$slug";

export const Route = createFileRoute("/magazine/room-ideas")({
  component: RoomIdeasPage,
});

function RoomIdeasPage() {
  return <MagazineCategoryContent slug="room-ideas" />;
}
