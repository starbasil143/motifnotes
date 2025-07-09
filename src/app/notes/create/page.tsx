'use client'

import SoundcloudBlock from "@/components/SoundcloudBlock";
import SoundcloudPlaylistChoice from "@/components/SoundcloudPlaylistChoice";
import SoundcloudPlaylistSearch from "@/components/SoundcloudPlaylistSearch";
import SoundcloudSearch from "@/components/SoundcloudSearch";
import { Button, Card, CardBody, Form, Input } from "@heroui/react";
import Script from "next/script";
import { FormEvent, useState } from "react";
import { SoundcloudPlaylist } from "soundcloud.ts";

export default function CreateNote() {

  const [searchResults, setSearchResults] = useState<SoundcloudPlaylist[]|null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<SoundcloudPlaylist|null>(null);

  const [noteTitle, setNoteTitle] = useState<string>('');

  const handleSubmit = () => {
    if (currentPlaylist) {
      const newNote = {
        title: noteTitle || currentPlaylist.title,
        playlist: currentPlaylist
      }
      console.log(newNote);
    }
    else {
      console.log('no playlist selected!!!')
    }
  }

  const handleClearPlaylist = () => {
    setCurrentPlaylist(null);
  }
  
  return (
    <div>
      <div className='flex justify-around'>
        <Card className='m-4 w-2xl'>
          <CardBody>
            <Form>
              <h1 className="text-center text-xl my-2 font-bold w-full">Create a new note</h1>
              <Input
                name='name'
                label='Title'
                labelPlacement='outside-top'
                className=''
              />

              <div className='flex flex-row justify-around w-full'>
                { currentPlaylist ? (
                  <SoundcloudPlaylistChoice playlist={currentPlaylist} onClearPlaylist={handleClearPlaylist}/>
                ) : (
                  <SoundcloudPlaylistSearch onSelectPlaylist={setCurrentPlaylist}/>
                )}
              </div>

              <Button className='m-2' color='primary' onMouseUp={handleSubmit}>Create</Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}