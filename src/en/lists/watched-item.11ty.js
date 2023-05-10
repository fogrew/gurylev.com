exports.data = {
  layout: 'base',
  template: 'article',
  criticalStyles: ['/css/templates/article.css'],
  asyncStyles: ['/css/plugins/avatar.css'],
  locale: 'ru',
  pagination: {
    data: 'watched',
    size: 1,
    addAllPagesToCollections: false,
    alias: 'movie',
  },
  permalink: ({movie}) => `/lists/${movie["Type"]}/${movie["TMDb ID"]}/`,
  header: true,
}

exports.render = async function({movie}) {
  const avatar = await this.image('/img/avatar.jpg', 'u-photo avatar avatar--circle', 'Andrey Gurylev photo', '', '20,40')
  return`
<article class="h-entry h-review page page--template-${ this.data.template }" id="main" itemscope itemtype="http://schema.org/Review">
  <header class="page__header">
    <h1 class="page__title p-name" itemprop="name headline">Watched ${movie["Name"]}</h1>
    <p>
      <a class="p-author h-card" href="/" itemprop="author" itemscope itemtype="https://schema.org/Person">
        ${avatar}
        <span itemprop="name">Andrey Gurylev</span>
      </a>
      watched
      <span itemprop="itemReviewed" itemscope itemtype="https://schema.org/Movie">
        <span content="${movie["Type"]}">${movie["Type"]}</span>
        <span itemprop="name">${movie["Name"]}</span>
      </span>
      <time class="post-date dt-published" datetime="${movie["Date Rated"]}" itemprop="datePublished">
        <a class="u-url" href="${ this.url(this.page.url) }">${this.readableDate(movie["Date Rated"])}</a>
      </time>
    </p>
  </header>
  <p class="page__summary p-summary" itemprop="description">
    <span class="p-rating" value="${movie["Your Rating"]}" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
      <meta itemprop="worstRating" content = "1">
      Rated <span itemprop="ratingValue">${Number.parseInt(movie["Your Rating"])}</span>
      out of <span itemprop="bestRating">10</span>
      <br>${'★'.repeat(Number.parseInt(movie["Your Rating"])).padEnd(10, '☆')}
    </span>
  </p>
  <div class="e-content page__content" id="content" itemprop="reviewBody">
    <p>On other sites: <a href="https://www.themoviedb.org/${movie["Type"]}/${movie["TMDb ID"]}" target="_blank" rel="noopener nofollow">TMDB</a>, <a href="https://www.imdb.com/title/${movie["IMDb ID"]}" target="_blank" rel="noopener nofollow">IMDB</a></p>
  </div>
  <footer class="page__footer">
    <p><a href="/lists/${movie["Type"]}/">← Back to ${movie["Type"]} list</a></p>
    <p><a href="/lists/">← Back to lists</a></p>
  </footer>
</article>
`
// TODO: add <span itemprop="reviewBody">with my opinion</span>
// TODO: get from TMDB image and add with <img itemprop="image"> to itemReviewed for making the review snippet valid
}
