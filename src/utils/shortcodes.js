const path = require('path');
const Image = require("@11ty/eleventy-img");

function getExtensionFallbacks (src) {
  const extension = path.extname(src);

  switch (extension) {
    case '.jpg':
      return ['avif', 'webp', 'jpeg']
    case '.png':
      return ['avif', 'webp', 'png']
    case '.svg':
      return ['svg']
    default:
      return null
  }
}

module.exports = {
  image: async function(src, className, alt, sizes, widths, imgWidth, itemprop) {
    let source = path.join("src/assets/" , src);
    let extensions = getExtensionFallbacks(src);
    let widthsArray = widths.split(',').map(width => Number(width))
    let metadata = await Image(source, {
      outputDir: './dist/img/',
      urlPath: '/img/',
      widths: widths ? widthsArray : [null],
      sharpJpegOptions: {
          quality: 80,
          progressive: true
      },
      formats: extensions,
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);

        return `${name}-${width}w.${format}`;
      }
    });

    if(imgWidth && !widths.includes(imgWidth)) {
      throw new Error(`\`imgWidth\` (${imgWidth}) must be in the list \`widths\` (${widths}) from: ${src}`);
    }

    // console.log(metadata)

    let firstSrc = metadata[extensions.pop()];
    let lowsrc = firstSrc[0];

    const getHeightByWidth = (targetWidth) => {
      const firstSrc = metadata[extensions.pop()];
      const targetImage = firstSrc.find(image => image.width == targetWidth)

      if(!targetImage) {
        console.log(firstSrc)
        throw new Error(`\`targetWidth\` (${targetWidth}) not found in \`firstSrc\` (${firstSrc[0].url})`);
      }

      return targetImage.height
    }
    const generateSrcSetDPR = (entry, index) => `${entry.url} ${index + 1}x`
    const generateSrcSetSizes = entry => entry.srcset

    return `<picture>
    ${Object.values(metadata).map(imageFormat => {
      const srcSetGenerator = sizes ? generateSrcSetSizes : generateSrcSetDPR;
      const sizesAttribute = sizes ? `sizes="${sizes}"` : '';
      return `<source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(srcSetGenerator).join(", ")}" ${sizesAttribute}>`;
    }).join("\n")}
      <img
        src="${lowsrc.url}"
        width="${imgWidth || lowsrc.width}"
        height="${imgWidth ? getHeightByWidth(imgWidth) : lowsrc.height}"
        class="${className}"
        alt="${alt}"
        loading="lazy"
        decoding="async"
        ${itemprop ? 'itemprop='+itemprop : ''}>
    </picture>`;
  },
  card: function({ url, title, date, text, imageLink, tag, classes } = {
    url,
    title,
    date,
    text,
    imageLink,
    tag: 'article',
    classes: ''
  }) {
    this.getFilter('lol')
    const image = imageLink ? `<span class="card__preview">${this.image(imageLink, 'card__image', 'photo of my cat')}</span>` : '';
    return `<${ tag } class="${ classes } card">
    <a class="card__link" href="${ url }">
      <span class="card__body">
        <h3 class="card__title">${ title }</h3>
        <time class="card__date" datetime="${ this.htmlDateString(date) }">${ this.readableDate(date) }</time>
        <p>${ text }</p>
      </span>
      ${image}
    </a>
  </${ tag }>`;
  }
};
