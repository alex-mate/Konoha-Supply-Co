const paths = {
  cart: <><path d="M2 3h3l3 12h11l3-9H6"/><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/></>,
  trash: <><path d="M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7"/></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
  leaf: <><path d="M20 3C9 2 3 7 4 14c1 7 14 8 16-11ZM4 20l11-11"/><path d="M10 14v-4m3 1h4"/></>,
  scroll: <><rect x="5" y="4" width="14" height="16" rx="3"/><path d="M8 8h8M8 12h8M8 16h5M3 4h4M17 20h4"/></>,
  apparel: <path d="m8 3-6 4 3 6 3-2v10h8V11l3 2 3-6-6-4c-1 4-7 4-8 0Z"/>,
  bowl: <><path d="M3 12h18c-1 5-4 8-9 8s-8-3-9-8ZM8 22h8M8 3c-3 3 3 4 0 7M15 2c-3 3 3 4 0 7"/></>,
  spark: <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  weapon: <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z M12 10v4M10 12h4"/>,
  coin: <><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v5c0 4 16 4 16 0V6M4 11v5c0 4 16 4 16 0v-5M4 16v3c0 4 16 4 16 0v-3"/></>
};
export default function DesignIcon({ name, className = "" }) {
  return <svg className={`design-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[name] || paths.spark}</svg>;
}
