"use client"

import { Button, Form, Input } from '@heroui/react'
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { SoundcloudPlaylist } from 'soundcloud.ts';
import SoundcloudPlaylistOption from './SoundcloudPlaylistOption';


export default function SoundcloudPlaylistSearch({
  onSelectPlaylist
} : {
  onSelectPlaylist: (playlist: SoundcloudPlaylist) => void
}) {
  
  const [queryInput, setQueryInput] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const [playlists, setPlaylists] = useState<SoundcloudPlaylist[]|null>(null)


  const resetSearch = () => {
    setQueryInput('');
    setQuery('');
    setPlaylists(null);
  }


  

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
         setPlaylists(data.playlists)
      })
      .catch(e => console.error(e));
  },[query, onSelectPlaylist])

  const handleTrackSearch = () => {
    setQuery(queryInput);
  }



  return (
    <Card className='m-4 p-6 w-full'>
      <div className=''>
        <Input
          className='w-full max-w-xs'
          isClearable
          type='text'
          label='Search for a playlist'
          labelPlacement='outside-top'
          variant='faded'
          value={queryInput}
          onChange={e=>setQueryInput(e.target.value)}
          onClear={resetSearch}
          onKeyDown={e=>{if(e.key==='Enter') {
              handleTrackSearch();
            }
          }}
        />
        <Button onMouseUp={handleTrackSearch} className='my-2'>Search</Button>
      </div>

      <div className=''>
        {
          !playlists?(
            <div></div>
          ) : playlists.length === 0 ? (
            <small>
              No playlists found
            </small>
          ) : (
            <ul>
              {playlists.map((playlist,index) => (
                <li key={index}>
                  <SoundcloudPlaylistOption playlist={playlist} onSelectPlaylist={onSelectPlaylist}/>
                </li>
              ))}
            </ul>
          )
        }
      </div>




    </Card>
  )

}