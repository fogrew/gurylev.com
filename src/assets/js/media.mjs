const mediaElement = document.querySelector('video, audio');
const timePrefix = '#t='

const goTime = () => {
  const { hash } = location
  if(!hash.startsWith(timePrefix)) return

  mediaElement.currentTime = hash.slice(timePrefix.length)
}

const saveEndedState = () => {
  const shortTime = parseInt(mediaElement.currentTime)
  history.replaceState(undefined, undefined, `${timePrefix}${shortTime}`)
}

mediaElement.addEventListener('pause', saveEndedState)
// mediaElement.addEventListener('timeupdate', saveEndedState)
// stop-stop-stop, cowboy! take care of the performance please
// TODO: add debounce

window.addEventListener('hashchange', goTime, false);
window.addEventListener('DOMContentLoaded', goTime, false);
