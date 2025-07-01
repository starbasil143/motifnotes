"use client"

import SoundcloudBlock from '@/components/SoundcloudBlock';
import SoundcloudSearch from '@/components/SoundcloudSearch';
import {Howl, Howler} from 'howler';
import { useState } from 'react';
import { SoundcloudPlaylist } from 'soundcloud.ts';

export default function Home() {

  const [currentPlaylist, setCurrentPlaylist] = useState<SoundcloudPlaylist|null>(null)

  return (
    <div>
      <div className="p-4 flex flex-col">
        <h1 className="font-bold text-2xl text-center">Okay bro</h1>
          <SoundcloudBlock trackId="2104582008"/>
          <SoundcloudBlock trackId="2104583157"/>
          <p>{currentPlaylist?.title}</p>
          {
            currentPlaylist?(
              <ul>
                {currentPlaylist.tracks.map((track, index) => (
                  <li key={index}> 
                    <SoundcloudBlock trackId={track.id.toString()}/>
                  </li>
                )

                )}
              </ul>
            ):(
              <p>Search a playlist name</p>
            )
          }
      </div>
      <SoundcloudSearch onSelectPlaylist={setCurrentPlaylist}/>
    </div>
  );
}
