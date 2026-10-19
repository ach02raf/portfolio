import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";

const root = path.resolve("out");
async function files(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...(await files(full)));
    else result.push(full);
  }
  return result;
}
async function exists(file) {
  try {
    return (await stat(file)).isFile();
  } catch {
    return false;
  }
}
const pages = (await files(root)).filter(
  (file) => file.endsWith(".html") && !file.endsWith("/404.html"),
);
for (const file of pages) {
  const html = await readFile(file, "utf8");
  const relative = path.relative(root, file);
  const locale = relative.match(/^(en|fr|de)(?:\/|\.)/)?.[1] ?? "fr";
  assert(
    html.includes(`<html lang="${locale}"`),
    `${relative}: incorrect document language`,
  );
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) ?? []).length,
    1,
    `${relative}: expected one primary heading`,
  );
  assert(
    html.includes('id="main-content"'),
    `${relative}: missing main landmark`,
  );
  assert(
    !/firstSection-snow-container|class="snowflake"/.test(html),
    `${relative}: obsolete snow markup`,
  );
  assert(
    !/<video[^>]*\bautoplay/i.test(html),
    `${relative}: unexpected autoplay`,
  );
  assert(
    !html.includes("[object Object]"),
    `${relative}: invalid rendered metadata or content`,
  );
  for (const [, attribute, raw] of html.matchAll(
    /\b(href|src|poster)="([^"#]*)"/g,
  )) {
    if (!raw.startsWith("/") || raw.startsWith("//")) continue;
    const url = new URL(raw.replaceAll("&amp;", "&"), "https://ach02raf.pro");
    const target = path.join(root, decodeURIComponent(url.pathname));
    const valid =
      (await exists(target)) ||
      (await exists(`${target}.html`)) ||
      (await exists(path.join(target, "index.html")));
    assert(valid, `${relative}: missing ${attribute} ${raw}`);
    if (attribute === "href" && url.hash) {
      const targetPage = (await exists(`${target}.html`))
        ? `${target}.html`
        : (await exists(path.join(target, "index.html")))
          ? path.join(target, "index.html")
          : target;
      if (targetPage.endsWith(".html"))
        assert(
          (await readFile(targetPage, "utf8")).includes(
            `id="${decodeURIComponent(url.hash.slice(1))}"`,
          ),
          `${relative}: missing anchor ${raw}`,
        );
    }
  }
}
for (const name of ["CNAME", ".nojekyll", "robots.txt", "sitemap.xml"])
  assert(
    await exists(path.join(root, name)),
    `Missing deployment file ${name}`,
  );
console.log(
  `Validated ${pages.length} exported pages: languages, headings, internal links, assets, anchors, and deployment files.`,
);
