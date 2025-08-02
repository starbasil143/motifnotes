'use client'

import SoundcloudBlock from '@/components/SoundcloudBlock';
import { getNote, getSoundcloudPlaylist } from '@/lib/actions';
import { NoteSchema } from '@/lib/schemas';
import { Card, Divider } from '@heroui/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { SoundcloudPlaylist, SoundcloudTrack } from 'soundcloud.ts'
import Script from 'next/script';
import SoundcloudSongListItem from '@/components/SoundcloudSongListItem';

export default function NotePage() {

  const params = useParams<{ id: string }>();
  const [note, setNote] = useState<NoteSchema | null>(null);
  const [playlist, setPlaylist] = useState<SoundcloudPlaylist|null>(null);

  const [currentTrack, setCurrentTrack] = useState<SoundcloudTrack|null>(null);
  
  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(()=>{
    

    async function initializeNote(id: string) {
      console.log(`Loading ${params.id}`);
      const noteObject = await getNote(id);
      setNote((note)=>noteObject);
      fetch(`/api/soundcloud/getPlaylist?q=${encodeURIComponent(noteObject.playlistId)}`)
        .then(res => res.json())
        .then(data => {
            setPlaylist(JSON.parse(JSON.stringify(data.playlist)));
          })
        .catch(e => console.error(e));
      }

    initializeNote(params.id);

  },[params])
  
  return (
    <div className='flex flex-col'>
      <Script 
        src = 'https://w.soundcloud.com/player/api.js' 
        onLoad = {()=>setWidgetReady(true)}
      />

      <h1 className=' text-center text-2xl mt-3'>{note?note.title:'note'}</h1>
      <div className='flex flex-row p-10 justify-center'>
        <Card className='p-2 min-w-lg max-h-[70vh] flex-1/2'>  
          <div>
            <h2 className='font-bold text-xl text-center'>Soundtrack</h2>
            <Divider/>
          </div>
          <ul className='overflow-y-scroll'>
            {playlist?.tracks.map((track, index) => (
              <li key={index}> 
                {/*<SoundcloudBlock trackId={track.id.toString()} widgetReady={widgetReady}/>*/}
                <SoundcloudSongListItem track={track} setCurrentTrack={setCurrentTrack}/>
              </li>
            )

            )}
          </ul>
          
        </Card>
        <Divider orientation="vertical" className='m-1'/>
        <Card className='p-2 min-w-lg flex-1/2'>
          <h2 className='font-bold text-xl text-center'>Motifs</h2>
          <Divider/>
          {currentTrack?(
            <div>
              <h3 className='text-center underline m-2'>{currentTrack.title}</h3>
              <SoundcloudBlock trackId={currentTrack.id.toString()} widgetReady={widgetReady}/>
            </div>
          ):(
            <div>
              <p>Select a track</p>
            </div>
          )}

        </Card>
      </div>
    </div>
  )
}