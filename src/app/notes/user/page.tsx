import SoundcloudBlock from '@/components/SoundcloudBlock';
import { getNote, getSoundcloudPlaylist, getUserNotes } from '@/lib/actions';
import { NoteSchema } from '@/lib/schemas';
import { Card, Divider, Link } from '@heroui/react';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { SoundcloudPlaylist, SoundcloudTrack } from 'soundcloud.ts'
import Script from 'next/script';
import SoundcloudSongListItem from '@/components/SoundcloudSongListItem';
import { ObjectId } from 'mongoose';
import { auth } from '@/auth';

export default async function UserNotesPage() {
  
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect('/signin')
  }
  const currentUser = session.user;

  const notes = await getUserNotes(session.user.id);
  
  
  return (
    <div className='flex flex-col'>
      <h1 className=' text-center text-2xl mt-3'>{`${currentUser.email}'s notes`}</h1>
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