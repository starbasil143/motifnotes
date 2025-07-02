"use client"

import { Button, Form, Input } from '@heroui/react'
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { SoundcloudPlaylist } from 'soundcloud.ts';


export default function SoundcloudSearch({
  onSelectPlaylist
} : {
  onSelectPlaylist: (playlist: SoundcloudPlaylist) => void
}) {
  
  const [queryInput, setQueryInput] = useState<string>('');
  const [query, setQuery] = useState<string>('');


  

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
    <Card className='m-4 p-6 w-full max-w-xs'>
      <Form onSubmit={handleTrackSearch} className='flex'>
        <Input
          className='w-full max-w-xs'
          isClearable
          type='text'
          label='Search for a playlist'
          labelPlacement='outside-top'
          variant='faded'
          value={queryInput}
          onChange={e=>setQueryInput(e.target.value)}
        />
        <Button type='submit' className=''>Search</Button>
      </Form>




    </Card>
  )

}