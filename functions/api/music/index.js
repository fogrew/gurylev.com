/**
 * Cloudflare Functions docs
 * @see {@link https://developers.cloudflare.com/pages/functions/get-started/|Cloudflare Functions docs}
 */
export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url)
  const recent = searchParams.get('recent')
  const { LASTFM_API_KEY, LASTFM_USER } = context.env

  if (recent == '1') {
    const API_URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=${LASTFM_API_KEY}&user=${LASTFM_USER}&limit=${recent}&format=json`
    const response = await fetch(API_URL)
    if(!response.ok) {
      return new Response(JSON.stringify({ error: `Last.fm API returns ${response.status} with text: ${response.statusText}` }), {
        status: 404
      })
    }
    const { recenttracks } = await response.json()
    const track = recenttracks.track[0]
    return new Response(JSON.stringify(track))
  } else {
    return new Response(JSON.stringify({
      error: 'Invalid parameters'
    }), {
      status: 404
    })
  }
}
