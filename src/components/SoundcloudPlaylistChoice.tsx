"use client"

import { Button, Form, Input } from '@heroui/react'
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import {Card, CardHeader, CardBody, CardFooter, Image} from "@heroui/react";
import { SoundcloudPlaylist } from 'soundcloud.ts';
import { Ban, FilePen, X } from 'lucide-react';


export default function SoundcloudPlaylistChoice({
  playlist,
  onClearPlaylist
} : {
  playlist: SoundcloudPlaylist;
  onClearPlaylist: () => void;
}) {

  return (
    <Card className='my-2 p-2 w-full'>
      <CardHeader className='flex justify-between'>
        <div className='flex flex-col items-start'>
          <h3>{playlist.title}</h3>
        </div>
        <Button color='primary' radius='lg' isIconOnly onMouseUp={onClearPlaylist}>
          <X />
        </Button>
      </CardHeader>
      <CardBody className='overflow-visible py-2 mb-4 grid grid-cols-3'>
        <div className='col-span-2'>
          { playlist.artwork_url?(
            <Image 
            alt=''
            src={playlist.artwork_url}
            className='rounded-xl object-cover'
            width={100}
            />
          ):(
            <Image 
              alt=''
              src='https://d21buns5ku92am.cloudfront.net/26628/images/419679-1x1_SoundCloudLogo_cloudmark-f5912b-large-1645807040.jpg'
              className='rounded-xl object-cover'
              width={100}
            />
          )}
        </div>
        <div className=''>
          <ul>
            <li><small>{playlist.track_count} tracks</small></li>
            <li><small>Uploaded by {playlist.user.username}</small></li>
          </ul>
        </div>
      </CardBody>
    </Card>
  )


}