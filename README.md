# Art of Living Together Competition Website

Website for the **Art of Living Together** annual national drawing competition in Ireland, organised by **Eire Dialogue**.

## Theme

```text
Love
```

This year's competition theme is **Love**.

## Key Dates

- Registration is open now and closes on 30 October 2026
- 21 September-30 October 2026: Postal artwork submission period
- 31 October-15 November 2026: Evaluation and finalist selection
- 5 December 2026: Grand Award Ceremony

## Finalists

Each category will have 10 finalists.

## Organiser

The About section uses the supplied Eire Dialogue organiser text and the supplied Art of Living Together competition description. The official website is linked as:

```text
www.eiredialogue.ie
```

## To Run Locally

Open `index.html` directly in a browser, or use a local static server such as VS Code Live Server.

## Files

- `index.html` contains the static page structure, competition content, and SEO metadata.
- `style.css` contains the visual theme and motion styling.
- `script.js` contains scroll animation, mobile navigation, card interaction, registration link reinforcement, and timeline status logic.
- `assets/` contains the supplied original logo and artwork assets.
- `assets/images/` contains optimized JPG images for the static HTML build.
- `wordpress-theme/` contains the WordPress classic theme source used to generate the uploadable theme zip.

## Logo and Site Icon

- Header, hero, and organiser logos use `assets/images/art-of-living-together-logo-tight.jpg`.
- WordPress Site Icon can use `assets/images/art-of-living-together-site-icon.jpg` for a more visible 512 x 512 square icon.

## SEO

The static HTML page includes:

- SEO title and meta description
- Canonical URL for `https://art.eiredialogue.ie/`
- Open Graph tags for WhatsApp/Facebook sharing
- Twitter card tags
- JSON-LD `Event` structured data

The WordPress theme includes the same SEO metadata through `wp_head` in `wordpress-theme/functions.php`.

## Registration Form

The Register call to action points to the organiser's approved Google Form:

```text
https://docs.google.com/forms/d/e/1FAIpQLSdoWwlukrp-uk00PQPO-JQZVB31S5TfeO-MlnkEfAR_bugV2A/viewform
```

The Google Form link is present directly in the HTML. JavaScript reinforces the same link, but registration does not depend on JavaScript being loaded.

Original drawings should be posted to:

```text
Motorcity, Kylemore Rd, Inchicore, Dublin 12, D12 TFR7 / Eire Dialogue
```

## WordPress Upload Package

The current uploadable WordPress package is kept one level above this repository:

```text
../art-of-living-together-competition-root-images-seo-20260829160119.zip
```

The package uses the `wordpress-theme/` source, with theme images stored in the theme root because the target WordPress hosting did not reliably extract nested image folders during upload.
