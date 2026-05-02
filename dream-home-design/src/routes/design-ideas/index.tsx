import { createFileRoute } from "@tanstack/react-router";
import { DesignIdeasLanding } from "../design-ideas";

export const Route = createFileRoute("/design-ideas/")({
  component: DesignIdeasLanding,
});
