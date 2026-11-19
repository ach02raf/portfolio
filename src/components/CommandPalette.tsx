"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n-config";
import { ui } from "@/content/ui";
import type { SearchItem } from "@/content/search";
import Icon, { type IconName } from "./Icon";
import "./CommandPalette.scss";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export default function CommandPalette({ lang, items }: { lang: Locale; items: SearchItem[] }) {
  const copy = ui[lang].search;
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [shortcut, setShortcut] = useState("Ctrl K");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (/Mac|iPhone|iPad/i.test(navigator.platform)) setShortcut("⌘ K");
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
      return;
    }
    document.body.classList.add("modal-open");
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      document.body.classList.remove("modal-open");
      window.clearTimeout(timer);
    };
  }, [open]);

  const results = useMemo(() => {
    const needle = normalize(query);
    if (!needle) return items.slice(0, 12);
    return items
      .filter((item) => normalize(`${item.title} ${item.section} ${item.keywords}`).includes(needle))
      .slice(0, 12);
  }, [items, query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    itemRefs.current[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const goTo = (item: SearchItem) => {
    setOpen(false);
    router.push(item.href);
    if (item.href.includes("#")) {
      const hash = item.href.split("#")[1];
      window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), 80);
    }
  };

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => (results.length ? (current + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => (results.length ? (current - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter" && results[active]) {
      event.preventDefault();
      goTo(results[active]);
    }
  };

  const iconFor = (section: string): IconName => {
    if (section === copy.groups.projects) return "layers";
    if (section === copy.groups.writing) return "book";
    if (section === copy.groups.services) return "sparkles";
    if (section === copy.groups.process) return "terminal";
    return "terminal";
  };

  const palette = (
    <div
      className="command-palette"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}>
      <div className="command-palette__panel panel" role="dialog" aria-modal="true" aria-label={copy.placeholder}>
        <div className="command-palette__head">
          <Icon name="search" size={19} />
          <input
            ref={inputRef}
            id="cmd-title"
            type="search"
            value={query}
            placeholder={copy.placeholder}
            aria-label={copy.placeholder}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
          />
          <button type="button" onClick={() => setOpen(false)} aria-label={copy.close}>
            <Icon name="close" size={17} />
          </button>
        </div>

        <div className="command-palette__results" role="listbox" aria-label={copy.open}>
          {results.length === 0 ? (
            <p className="command-palette__empty">
              {copy.noResults} <strong>“{query}”</strong>
            </p>
          ) : (
            results.map((item, index) => (
              <button
                type="button"
                key={item.id}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                role="option"
                aria-selected={active === index}
                className={`command-palette__item ${active === index ? "is-active" : ""}`}
                onMouseEnter={() => setActive(index)}
                onClick={() => goTo(item)}>
                <span className="command-palette__item-icon mono">
                  <Icon name={iconFor(item.section)} size={15} />
                </span>
                <span className="command-palette__item-text">
                  <strong>{item.title}</strong>
                  <small className="mono">{item.section}</small>
                </span>
                <Icon name="arrow-up-right" size={15} />
              </button>
            ))
          )}
        </div>

        <div className="command-palette__foot mono">{copy.hint}</div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="search-trigger"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => setOpen(true)}
        aria-label={copy.open}>
        <Icon name="search" size={16} />
        <span>{copy.open}</span>
        <kbd className="mono">{shortcut}</kbd>
      </button>

      {open && mounted ? createPortal(palette, document.body) : null}
    </>
  );
}
