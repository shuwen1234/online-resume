"""Create small web fonts for the characters used by the generated resume."""

from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont


root = Path(__file__).resolve().parent.parent
font_dir = root / "lapis-cv" / "fonts"
output_dir = font_dir / "web"
output_dir.mkdir(exist_ok=True)

text = (root / "resume-text.html").read_text(encoding="utf-8")
characters = set(text)
characters.update(chr(codepoint) for codepoint in range(32, 127))

for name in (
    "SourceHanSansCN-Regular",
    "SourceHanSansCN-Medium",
    "SourceHanSerifCN-Bold",
    "JetBrainsMono-Regular",
):
    options = subset.Options()
    options.flavor = "woff2"
    font = TTFont(font_dir / f"{name}.ttf")
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes={ord(character) for character in characters})
    subsetter.subset(font)
    font.flavor = "woff2"
    target = output_dir / f"{name}.woff2"
    font.save(target)
    print(f"{target.relative_to(root)}: {target.stat().st_size:,} bytes")
