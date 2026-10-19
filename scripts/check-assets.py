"""Check referenced local scripts, images, fonts, styles and videos in a static export."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
import sys

root = Path(sys.argv[1] if len(sys.argv) > 1 else 'docs').resolve()
missing = []
class AssetParser(HTMLParser):
    current = None
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            is_asset = key in ('src', 'poster') or (key == 'href' and value and value.startswith('/_next/'))
            if is_asset and value and value.startswith('/') and not value.startswith('//'):
                target = root / unquote(urlsplit(value).path).lstrip('/')
                if not target.is_file():
                    missing.append((self.current, value))

pages = list(root.rglob('*.html'))
if not pages:
    raise SystemExit(f'No exported HTML pages found in {root}')
parser = AssetParser()
for page in pages:
    parser.current = str(page.relative_to(root))
    parser.feed(page.read_text())
if missing:
    for page, asset in missing:
        print(f'{page}: missing {asset}', file=sys.stderr)
    raise SystemExit(1)
print(f'Validated local asset references in {len(pages)} exported pages.')
