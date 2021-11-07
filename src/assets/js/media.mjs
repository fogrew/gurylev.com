const mediaElement = document.querySelector('video, audio')
const timePrefix = '#t='
let seeking = 0

const goTime = () => {
  const { hash } = location
  if(!hash.startsWith(timePrefix)) return

  mediaElement.currentTime = hash.slice(timePrefix.length)
}

const getShortTime = () => {
  return parseInt(mediaElement.currentTime)
}

const saveEndedState = () => {
  history.replaceState(undefined, undefined, `${timePrefix}${getShortTime()}`)
}

const getSubtitles = () => {
}

const updateTableOfContents = () => {
  const activeCueTime = mediaElement?.textTracks[0]?.activeCues[0]?.startTime

  if(!activeCueTime) return
  if(activeCueTime == seeking) return

  const activeTimeLink = document.querySelector(`.seekable[href="#t=${activeCueTime}"]`)
  const prevTimeLink = document.querySelector(`.seekable.seeking`)

  activeTimeLink?.classList?.add('seeking')
  prevTimeLink?.classList?.replace('seeking', 'seeked')

  seeking = activeCueTime
}

mediaElement.addEventListener('pause', saveEndedState)
// mediaElement.addEventListener('timeupdate', updateTableOfContents)
mediaElement.addEventListener('timeupdate', updateTableOfContents, { passive: true })
// mediaElement.addEventListener('timeupdate', saveEndedState)
// stop-stop-stop, cowboy! take care of the performance please
// TODO: add debounce

window.addEventListener('hashchange', goTime, false);
window.addEventListener('DOMContentLoaded', goTime, false);
