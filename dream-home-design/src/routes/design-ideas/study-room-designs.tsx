import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeaCategoryContent } from "./$slug";

export const Route = createFileRoute("/design-ideas/study-room-designs")({
  component: StudyRoomDesignsPage,
});

function StudyRoomDesignsPage() {
  return <DesignIdeaCategoryContent slug="study-room-designs" />;
}
