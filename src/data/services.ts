import _kebabCase from 'lodash/kebabCase';

export const SERVICES = [
  "Branding & Design",
  "SEO & Digital Marketing",
  "E-Commerce Solutions",
  "Office Network Solutions",
  "App & Web development",
  "Business Software",
] as const;

export const SERVICE_SLUGS = SERVICES.reduce((acc, service) => {
  return {
    ...acc,
    [_kebabCase(service)]: service,
  }
}, {} as Record<string, typeof SERVICES[number]>);