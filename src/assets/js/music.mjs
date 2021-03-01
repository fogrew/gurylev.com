import { formatDate } from './formatDate.mjs';

const node = document.querySelector('.recent-track')

fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=cc9faf8fe35992da103b2b514f648254&user=Kasumi_Candor&limit=1&format=json`)
  .then(response => response.json())
  .then(({recenttracks}) => {
    console.log(recenttracks);
    const track = recenttracks.track[0];
    const isPlaying = track['@attr']?.nowplaying
    const time = isPlaying ? Date.now() : track.date["#text"];
    const verb = isPlaying ? 'Слушаю' : 'Слушал';
    const title = `<a href="https://www.last.fm/user/Kasumi_Candor">${track.artist["#text"]} - ${track.name}</a>`
    const date = new Date(time);
    node.innerHTML = `${verb} ${title} ${formatDate(date)}`;
  }).catch((e) => {
    console.log(e)
  });
