import { MetadataRoute } from "next";
import { siteMeta } from "@/data/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteMeta.url}/sitemap.xml`,
  };
}
