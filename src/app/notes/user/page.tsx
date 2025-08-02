'use client'

import SoundcloudBlock from '@/components/SoundcloudBlock';
import { getNote, getSoundcloudPlaylist, getUserNotes } from '@/lib/actions';
import { NoteSchema } from '@/lib/schemas';
import { Card, Divider, Link } from '@heroui/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { SoundcloudPlaylist, SoundcloudTrack } from 'soundcloud.ts'
import Script from 'next/script';
import SoundcloudSongListItem from '@/components/SoundcloudSongListItem';
import { ObjectId } from 'mongoose';

export default function UserNotesPage() {


  const currentUser = {username: 'basil', _id: '688e43f3a79a1b050ab89a17'}; //placeholder user before i actually implement accounts

  const params = useParams<{ id: string }>();
  const [notes, setNotes] = useState<NoteSchema[] | null>(null);
  const [playlist, setPlaylist] = useState<SoundcloudPlaylist|null>(null);

  const [currentTrack, setCurrentTrack] = useState<SoundcloudTrack|null>(null);
  
  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(()=>{
    

    async function initializeNoteList(user: typeof currentUser) {
      console.log(`Loading ${user.username}'s notes`);
      const returnedNotes = await getUserNotes(user._id);
      setNotes((notes)=>returnedNotes);
    }

    initializeNoteList(currentUser);

  },[])
  
  return (
    <div className='flex flex-col'>
      <h1 className=' text-center text-2xl mt-3'>{`${currentUser.username}'s notes`}</h1>
      <div className='flex flex-row p-10 justify-center'>
        <Card className='p-2 min-w-lg max-h-[70vh]'>  
          {notes?(


            <ul className='overflow-y-scroll'>
            {notes.map((note, index) => (
              <li key={index}> 
                <div>
                  <Link href={`/notes/${note._id}`}>{note.title}</Link>
                </div>
              </li>
            )
            
          )}
          </ul>
          
          ):(<p>Loading may be....</p>)}
        </Card>
      </div>
    </div>
  )
}