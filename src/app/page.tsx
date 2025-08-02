"use client"

import SoundcloudBlock from '@/components/SoundcloudBlock';
import SoundcloudSearch from '@/components/SoundcloudSearch';
import {Howl, Howler} from 'howler';
import Script from 'next/script';
import { useState } from 'react';
import { SoundcloudPlaylist } from 'soundcloud.ts';

export default function Home() {

  const [currentPlaylist, setCurrentPlaylist] = useState<SoundcloudPlaylist|null>(null)
  const [widgetReady, setWidgetReady] = useState(false);

  return (
    <div>
      <Script 
        src = 'https://w.soundcloud.com/player/api.js' 
        onLoad = {()=>setWidgetReady(true)}
      />


      <div className="p-2 flex flex-col">


      </div>
    </div>
  );
}
