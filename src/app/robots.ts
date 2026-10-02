import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/axn-karann"],
    },
    sitemap: "https://itsgkaranmishra.web.app/sitemap.xml",
  };
}
