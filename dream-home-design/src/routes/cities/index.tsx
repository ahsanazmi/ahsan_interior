import { createFileRoute } from "@tanstack/react-router";
import { CitiesLanding } from "../cities";

export const Route = createFileRoute("/cities/")({
  component: CitiesLanding,
});
