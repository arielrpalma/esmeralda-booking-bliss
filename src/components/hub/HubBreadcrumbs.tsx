import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  href?: string;
}

/** Visual breadcrumb trail. JSON-LD is emitted by the page via Helmet. */
const HubBreadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Migas de pan" className="mb-6">
    <ol className="flex flex-wrap items-center gap-1 font-body text-xs text-muted-foreground">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1">
          {item.href ? (
            <Link to={item.href} className="hover:text-primary transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className="text-foreground/70" aria-current="page">
              {item.name}
            </span>
          )}
          {i < items.length - 1 && <ChevronRight size={12} className="opacity-50" />}
        </li>
      ))}
    </ol>
  </nav>
);

export default HubBreadcrumbs;
