import { SERVICE_SLUGS } from "@/data/services";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const s: MetadataRoute.Sitemap = Object.keys(SERVICE_SLUGS).map((slug) => ({
    url: `https://smarthyperion.com/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://smarthyperion.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://smarthyperion.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://smarthyperion.com/team',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://smarthyperion.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...s,
  ]
}