"use client"

import { searchForTrack } from '@/lib/actions';
import Form from 'next/form';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { SoundcloudPlaylist } from 'soundcloud.ts';


export default function SoundcloudSearch({
  onSelectPlaylist
} : {
  onSelectPlaylist: (playlist: SoundcloudPlaylist) => void
}) {
  
  const [queryInput, setQueryInput] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const [results, setResults] = useState<any>(null);

  

  useEffect(()=>{
    const updateCurrentPlaylist = (playlist: SoundcloudPlaylist) => {
      onSelectPlaylist(playlist);
    }

    if (query.trim()===''){
      return;
    }
    fetch(`/api/soundcloud/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
         updateCurrentPlaylist(data.playlists[0])
        console.log(data.playlists.map((x:any)=>x.title));
      })
      .catch(e => console.error(e));
  },[query, onSelectPlaylist])

  const handleTrackSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(queryInput);
  }



  return (
    <div>
      <form onSubmit={handleTrackSearch}>
        <input 
          type="text"
          value={queryInput}
          onChange={(e)=>setQueryInput(e.target.value)}
          />
        <button type="submit">ok</button>
      </form>




    </div>
  )

}