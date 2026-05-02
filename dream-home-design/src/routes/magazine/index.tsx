import { createFileRoute } from "@tanstack/react-router";
import { MagazineLanding } from "../magazine";

export const Route = createFileRoute("/magazine/")({
  component: MagazineLanding,
});
