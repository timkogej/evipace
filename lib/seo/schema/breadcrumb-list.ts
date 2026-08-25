import { SITE_URL } from "../site-config";

type BreadcrumbItem = {
  name: string;
  path: string;
};

/** BreadcrumbList for real, reachable URLs only. */
export function buildBreadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`
    }))
  };
}
