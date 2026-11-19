import type { Locale } from "@/i18n-config";
import { ui } from "@/content/ui";
import Icon, { type IconName } from "./Icon";
import "./StatsStrip.scss";

export default function StatsStrip({
  lang,
  projects,
  articles,
}: {
  lang: Locale;
  projects: number;
  articles: number;
}) {
  const copy = ui[lang].stats;
  const items: { label: string; value: string; icon: IconName }[] = [
    { label: copy.projects, value: `${projects}+`, icon: "layers" },
    { label: copy.articles, value: `${articles}`, icon: "book" },
    { label: copy.stack, value: "40+", icon: "code" },
    { label: copy.experience, value: "1+", icon: "terminal" },
  ];

  return (
    <div className="stats-strip">
      <div className="shell stats-strip__grid">
        {items.map((item) => (
          <div className="stats-strip__item" key={item.label}>
            <span className="stats-strip__icon"><Icon name={item.icon} size={18} /></span>
            <strong>{item.value}</strong>
            <span className="stats-strip__label mono">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
