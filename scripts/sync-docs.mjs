import { access, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

// Keep the branch-based Pages deployment up to date as well as the Actions artifact.
await Promise.all(
  ["out/en.html", "out/fr.html", "out/de.html", "out/_next/static"].map(
    (file) => access(file),
  ),
);
let domain = "ach02raf.pro\n";
try {
  domain = await readFile("docs/CNAME", "utf8");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
await writeFile("out/CNAME", domain);
await writeFile("out/.nojekyll", "");
await rm("docs", { recursive: true, force: true });
await mkdir("docs", { recursive: true });
await cp("out", "docs", { recursive: true });
console.log(
  "Updated docs from the production export, preserving the custom domain.",
);
