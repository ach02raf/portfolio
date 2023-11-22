"use client"
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import "./ItemProject.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faLink} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import ProjectDelails from '../ProjectDelails/ProjectDelails';
function ItemProject(props: {
    ItemsProject: {
        id: string;
        nameProject: string;
        title: string;
        descProject: string;
        imgProject: string;
        videoProject: string;
        urlProject: string[];
        urlSITE: string[];
        apk: string;
        tools: string[];
    }
  }) {
   const [showPopUp,setShowPopUp]=useState(false)
   const PopUp = useRef<HTMLDivElement>(null);

   useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
       if (PopUp.current && !PopUp.current.contains(event.target as Node)) {
         // Clicked outside the component, close it
         setShowPopUp(false);
       }
     };
 
     document.addEventListener('mousedown', handleClickOutside);
 
     return () => {
       // Cleanup the event listener on component unmount
       document.removeEventListener('mousedown', handleClickOutside);
     };
   }, []);
  return (
   <div>
     <div className='row p-3  m-3 itemProject'>
          <div className='itemProject-img d-block m-auto p-0' onClick={()=>{setShowPopUp(true)}}>
        {props?.ItemsProject?.imgProject &&   <Image
                  src={`/Images/${props?.ItemsProject?.imgProject}.png`}
                  alt={props?.ItemsProject?.imgProject}
                  title={props?.ItemsProject?.imgProject}
                  height={512}
                  width={512}  
                />}
                {/* {props?.ItemsProject?.videoProject &&   <video width="320" height="240" controls>
                <source src={`/${props?.ItemsProject?.videoProject}.mp4`} type="video/webm" />
                </video>
                } */}
          </div>
         
     {props?.ItemsProject?.urlSITE[0] && <Link href={props?.ItemsProject?.urlSITE[0]} rel='preload' target='blanc'>  <h3 className='text-center py-3 px-2'> <FontAwesomeIcon className='itemProject-link' icon={faLink} /> {props?.ItemsProject?.nameProject}</h3></Link>}
     {props?.ItemsProject?.apk && <Link href={`/${props?.ItemsProject?.apk}.apk`} download="Go-Trip.apk" rel='preload' target='blanc'>  <h3 className='text-center py-3 px-2'> <FontAwesomeIcon className='itemProject-link' icon={faDownload} /> {props?.ItemsProject?.nameProject}</h3></Link>}
     {!props?.ItemsProject?.apk && !props?.ItemsProject?.urlSITE[0] && <h3 className='text-center py-3 px-2'>{props?.ItemsProject?.nameProject}</h3>}
    </div>
    <div ref={PopUp} className={`itemProject-popUp position-fixed ${showPopUp ? "d-block": "d-none"}`}><ProjectDelails ItemsProject={props?.ItemsProject} /></div>
   </div>
  )
}

export default ItemProject