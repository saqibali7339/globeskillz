# Portfolio Screenshots — Drop Your Real Project Images Here

Every portfolio card on the homepage currently uses a drag-and-drop **`<image-slot>`** placeholder. You can either:

## Option A — Drop images on the live site (quickest, temporary)
Open `index.html` in a browser, drag your screenshot onto any placeholder. It saves in the browser's storage and shows only on your device.

## Option B — Add permanent images (recommended for launch)

1. Save each screenshot into this folder (`assets/projects/screenshots/`) with these exact names:

| File name | Card |
| --- | --- |
| `bubblebum.jpg` | Bubblebum |
| `jardine.jpg` | Jardine |
| `sandaoil.jpg` | Sanda Oil |
| `sensibelle.jpg` | Sensibelle |
| `sahel.jpg` | Sahel Solar |
| `vytal.jpg` | Vennique / Vytal Beet |
| `zermatt.jpg` | Zermatt Stil |
| `ebike.jpg` | E‑bike brand |
| `cellblog.jpg` | Cell phone blog |
| `bubblebum2.jpg` | Bubblebum reimagined |
| `wooden.jpg` | Wooden tables |
| `water.jpg` | Water for Life |

2. Open `/index.html` and — for each card — replace its `<image-slot id="proj-XYZ" …>` line with:

```html
<img src="assets/projects/screenshots/XYZ.jpg" alt="XYZ" class="p-card__slot" style="object-fit:cover;">
```

For example the Bubblebum card becomes:
```html
<img src="assets/projects/screenshots/bubblebum.jpg" alt="Bubblebum" class="p-card__slot" style="object-fit:cover;">
```

3. Commit + push. Done.

## Owner photo (About section)

Save your photo as `assets/owner.jpg`, then in `index.html` swap the `<image-slot id="owner-photo" …>` line for:
```html
<img src="assets/owner.jpg" alt="Saqib Ali" style="width:100%;height:100%;object-fit:cover;">
```

## Recommendations

- **Format:** `.jpg` for photos, `.png` if you need transparency
- **Dimensions:** at least 1200px wide; the site scales them down
- **File size:** keep each under 400 KB. Use [Squoosh](https://squoosh.app) to compress.
