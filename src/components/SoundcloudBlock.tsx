"use client"
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';



export default function SoundcloudBlock({
  trackId,
  widgetReady
}: {
  trackId: string,
  widgetReady: boolean
}) {

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [widget, setWidget] = useState<any>(null);

  useEffect(() => {
    if (iframeRef.current && widgetReady) {
      const widgetInstance = (window as any).SC.Widget(iframeRef.current);
      setWidget(widgetInstance);
    }
  }, [widgetReady]);

  const getSrc = (trackId : string) => {
    return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%23d66853&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`
  }
    
  return (
    <>

      <div className="flex">
        <iframe 
          ref = { iframeRef }
          src = {getSrc(trackId)}
          width = {400}
        />
        <button className="border-darkish border-2 rounded-2xl bg-medium m-3 hover:bg-darkish active:bg-contrast"
          onClick={()=>widget.getPosition((pos:string)=>console.log(pos))}
        >
          get current timestamp
        </button>
      </div>
    </>
  )
}


/* Default spotify embed stuff converted to tailwind:

  <div 
    className="text-[10px] text-[#cccccc] wrap-anywhere break-normal overflow-hidden whitespace-nowrap overflow-ellipsis font-[Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif] font-bold"
  >
    <a 
      href="https://soundcloud.com/tobyfox-music" 
      title="Toby Fox" 
      target="_blank" 
      className="text-[#cccccc] decoration-0"
    >
      Toby Fox
    </a> 
    · 
    <a 
      href="https://soundcloud.com/tobyfox-music/from-now-on-battle-2" 
      title="From Now On (Battle 2)" 
      target="_blank" 
      className="text-[#cccccc] decoration-0"
    >
      From Now On (Battle 2)
    </a>
  </div>
*/