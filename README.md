# Nancy’s Crochets

A responsive, dependency-free storefront for Nancy’s Crochets. This is a static website: it has no payment provider, inventory backend, or connected contact service.

## Run locally

Open `index.html` in a browser, or serve this folder with a local static server such as the VS Code Live Server extension. No package installation or build step is needed.

## Update the catalogue

Edit `product-data.js` to add, update, or remove sample product entries. Each product includes its name, category, image, image description, colour and fit notes, and product description. Replace the sample wording and local images with confirmed product information before publishing. Prices and current availability are intentionally shown as enquiry-only because they have not been provided.

Place product photos in `assets/` and set each entry’s `image` and `imageAlt` values to match. The bundled editorial photos are illustrative sample imagery, not representations of confirmed Nancy’s Crochets stock.

## Contact and orders

The contact form validates entries in the browser but does not send or store them. Product enquiry buttons prefill the contact form; they do not create an order. Connect a real business email or form service before accepting enquiries. A WhatsApp link is omitted because no business number was supplied. No payment or checkout is implemented.

## Deploy

Upload the site files and `assets/` folder to any static hosting provider. GitHub Pages, Netlify, and Cloudflare Pages can serve this site without a build command. Configure the provider to publish the project root. Add real product photos, prices, availability, and a working contact endpoint before launch.

## Bundled photo credits

Illustrative sample photos are from Pexels:

- [Woman in a crochet top](https://www.pexels.com/photo/woman-standing-beside-railing-1785328/)
- [Woman in a crochet outfit](https://www.pexels.com/photo/portrait-of-woman-in-yellow-clothes-18197357/)
- [Man in a textured hat](https://www.pexels.com/photo/stylish-portrait-of-a-man-in-knit-hat-35487498/)
- [Maker crocheting at home](https://www.pexels.com/photo/crop-black-artisan-crocheting-with-hook-at-home-7585768/)
- [Teenager in contemporary streetwear](https://www.pexels.com/photo/teenager-in-urban-streetwear-at-nighttime-34380737/)
