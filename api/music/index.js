const fetch = require('node-fetch')
const { LASTFM_API_KEY, LASTFM_USER } = process.env

module.exports = async (req, res) => {
  const {
    query: { recent },
  } = req

  if (recent == '1') {
    const API_URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=${LASTFM_API_KEY}&user=${LASTFM_USER}&limit=${recent}&format=json`
    const response = await fetch(API_URL)
    if(!response.ok) {
      res.status(404).json({ error: `Last.fm API returns ${response.status} with text: ${response.statusText}` })
    }
    const { recenttracks } = await response.json()
    const track = recenttracks.track[0]
    res.status(200).json(track)
  } else {
    res.status(404).json({ error: 'Invalid parameters' })
  }
}
