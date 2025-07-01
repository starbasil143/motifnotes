"use server"

export async function searchForTrack(query : string | null) {
  const res = await fetch(`http:localhost:3000/api/soundcloud/search?q=${query}`)

  res.json()
  .then (result => {
    return result;
  })
}