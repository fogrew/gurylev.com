module.exports = {
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
