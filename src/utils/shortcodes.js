const path = require('path');
const Image = require("@11ty/eleventy-img");
const EleventyFetch = require("@11ty/eleventy-fetch");

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
  moviePreview: async function(id) {
    const apiHost = 'https://api.themoviedb.org';
    const imgHost = 'https://image.tmdb.org/t/p/original';
    const apiKey = 'f2136ccacb0977dc008d5ea49c768321';
    const apiMovie = `${apiHost}/3/movie/${id}/images?api_key=${apiKey}`
    const posterFallback = 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'

    try {
      const payload = await EleventyFetch(apiMovie, {
        duration: "1y",
        type: "json"
      });
      const poster = payload?.posters?.[0]?.file_path
      return poster ? `${imgHost}${poster}` : posterFallback // this.image(poster, 'card__image', 'poster')
    } catch (error) {
      return posterFallback
    }
  },
  subscribe: async function(link, topic) {
    return `<a href="${link}">📰 Subsribe to RSS feed with ${topic}</a>`
  }
  // card: function({ url, title, date, text, imageLink, tag, classes } = {
  //   url,
  //   title,
  //   date,
  //   text,
  //   imageLink,
  //   tag: 'article',
  //   classes: ''
  // }) {
  //   const image = imageLink ? `<span class="card__preview">${this.image(imageLink, 'card__image', 'photo of my cat')}</span>` : '';
  //   return `<${ tag } class="${ classes } card">
  //   <a class="card__link" href="${ url }">
  //     <span class="card__body">
  //       <h3 class="card__title">${ title }</h3>
  //       <time class="card__date" datetime="${ this.htmlDateString(date) }">${ this.readableDate(date) }</time>
  //       <p>${ text }</p>
  //     </span>
  //     ${image}
  //   </a>
  // </${ tag }>`;
  // }
};
