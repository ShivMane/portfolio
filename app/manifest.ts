import type { MetadataRoute } from "next";
import { siteMeta } from "@/data/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMeta.title,
    short_name: siteMeta.name,
    description: siteMeta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
