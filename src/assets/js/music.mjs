import { formatDate } from './formatDate.mjs';

const node = document.querySelector('.recent-track')

fetch(`/api/music/?recent=1`)
  .then(response => response.json())
  .then((track) => {
    const isPlaying = track['@attr']?.nowplaying
    const time = isPlaying ? Date.now() : track.date["#text"];
    const verb = isPlaying ? 'Слушаю' : 'Слушал';
    const title = `<a href="https://www.last.fm/user/Kasumi_Candor">${track.artist["#text"]} - ${track.name}</a>`
    const date = new Date(time);
    node.innerHTML = `${verb} ${title} ${formatDate(date)}`;
  }).catch((e) => {
    console.log(e)
  });
