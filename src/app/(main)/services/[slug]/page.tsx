import { SERVICE_SLUGS } from "@/data/services";
import { Metadata } from "next";

export function generateStaticParams() {
  return Object.keys(SERVICE_SLUGS).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: PageProps): Metadata {
  const serviceName = SERVICE_SLUGS[params.slug];

  return {
    title: `${serviceName} | Smart Hyperion Web Design & Digital Solutions`,
    description: `Learn about our ${serviceName} service and how it can help your business grow.`,
    alternates: {
      canonical: `/services/${params.slug}`,
    }
  };
}

interface PageProps {
  params: { slug: string };
}

export default function ServicePage({ params }: PageProps) {
  return (
    <div className="flex justify-center items-center text-center text-6xl md:text-[5rem] lg:text-[7rem] my-[50vh] uppercase">
      <h1 className="font-anton">Coming Soon</h1>
    </div>
  );
}
