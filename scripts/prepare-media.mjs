import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
await mkdir(path.join(root, "public/media"), { recursive: true });
const dictionaries = await Promise.all(
  ["en", "fr", "de"].map(async (lang) =>
    JSON.parse(await readFile(`dictionaries/${lang}.json`, "utf8")),
  ),
);
const images = new Map([["portrait", "public/Images/profile.png"]]);
for (const dictionary of dictionaries) {
  for (const project of dictionary.Project.list) {
    for (const name of project.imgProject ?? [])
      images.set(name, `public/Images/${name}.png`);
  }
  for (const post of dictionary.blog.blogList)
    images.set(post.img, `public/Images/${post.img}.jpg`);
}
for (const [name, input] of images) {
  await sharp(input)
    .rotate()
    .resize({
      width: name === "portrait" ? 480 : 1200,
      withoutEnlargement: true,
    })
    .webp({ quality: 80, effort: 5 })
    .toFile(`public/media/${name}.webp`);
}
console.log(
  `Prepared ${images.size} optimized images. The Communic Flow poster is an extracted frame retained in public/media.`,
);
