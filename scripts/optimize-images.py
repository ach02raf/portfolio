"""Re-encode existing artwork without changing its size or composition.
Run with Python 3 and Pillow installed. Originals are retained.
"""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1] / 'public' / 'Images'
target = root / 'optimized'
target.mkdir(exist_ok=True)
inputs = [root / 'back.png', root / 'profile.png', *sorted((root / 'Icons').glob('*.png'))]
before = after = 0
for source in inputs:
    output = target / ('icon-' + source.stem + '.webp' if source.parent.name == 'Icons' else source.stem + '.webp')
    with Image.open(source) as image:
        if source.name == 'back.png':
            image.save(output, 'WEBP', quality=92, method=6)
        else:
            image.save(output, 'WEBP', lossless=True, method=6)
    before += source.stat().st_size
    after += output.stat().st_size
print(f'{len(inputs)} images: {before:,} bytes → {after:,} bytes; original dimensions retained.')
