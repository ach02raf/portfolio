"use client"
import React from "react";
import "./ProjectDelails.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faDownload,
  faLink,
  faArrowAltCircleLeft
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from 'next/navigation'
function ProjectDelails(props: {
    ItemsProject: {
      id: string;
      nameProject: string;
      slug: string;
      title: string;
      descProject: string;
      imgProject: string;
      videoProject: string;
      urlProject: string[];
      urlSITE: string[];
      apk: string;
      usedTools: string;
      tools: string[];
      infoProject: string;
      visitSites: string;
      codeSource: string;
      downloadAPK: string;
}

}) {
  const router = useRouter()
  return (
    <div className="project-details p-xl-5 p-2">
     <div className="project-details-contain d-block m-auto">
      <div className="row mb-3 ">
        <div className="col-lg-2 col-12">
          <button className="project-details-contain-backHome" onClick={()=>router.back()}>
          <FontAwesomeIcon className="project-details-contain-backHome-icon" icon={faArrowAltCircleLeft} /></button>
        </div>
        <div className="col-lg-10 col-12 text-lg-end text-center project-details-title position-relative">
          <h4 className="">{props?.ItemsProject.nameProject}</h4>
        </div>
      </div>
      <div className="">
        <div className="row ">
          {props?.ItemsProject?.imgProject && (
            <div
              className={
                props?.ItemsProject?.videoProject ? "col-xl-8 col-12" : "col-12"
              }>
              <Image
                src={`/Images/${props?.ItemsProject?.imgProject}.png`}
                alt={props?.ItemsProject?.imgProject}
                title={props?.ItemsProject?.imgProject}
                height={512}
                width={1512}
              />{" "}
            </div>
          )}
          {props?.ItemsProject?.videoProject && (
            <div className="col-xl-4 col-12 py-xl-0 py-3">
              <video width="100%" height="300px" controls>
                <source
                  src={`/${props?.ItemsProject?.videoProject}.mp4`}
                  type="video/webm"
                />
              </video>
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-xl-7 ">
            {" "}
            <h5 className="py-3 position-relative">
              {props?.ItemsProject?.infoProject}
            </h5>
            <h6>{props?.ItemsProject?.title}</h6>
            <p className="py-2">{props?.ItemsProject?.descProject}</p>
          </div>
          <div className="col-xl-5">
            <h5 className="py-3 position-relative">
              {props?.ItemsProject?.usedTools}
            </h5>
            <div className="row">
              {props?.ItemsProject?.tools?.map((item, index) => (
                <div className="col-xl-3 col-4" key={index}>
                  <Image
                    src={`/Images/Icons/${item}.png`}
                    alt={item}
                    title={item}
                    height={100}
                    width={100}
                  />
                </div>
              ))}
            </div>
          
          </div>
        </div>
        <div className="row justify-content-center">
         {props?.ItemsProject?.urlSITE[0] && (
          <div className="col-md-6 "> 
              <Link
                href={props?.ItemsProject?.urlSITE[0]}
                rel="preload"
                target="blanc">
                {" "}
                <p className="text-center">
                  {" "}
                  <FontAwesomeIcon
                    className="project-details-link"
                    icon={faLink}
                  />{" "}
                  {props?.ItemsProject?.visitSites}
                </p>
              </Link></div>
            )}
            {props?.ItemsProject?.apk && (
              <div className="col-md-6 "><Link
                href={`/${props?.ItemsProject?.apk}.apk`}
                download="Go-Trip.apk"
                rel="preload"
                target="blanc">
                {" "}
                <p className="text-cente">
                  {" "}
                  <FontAwesomeIcon
                    className="project-details-link"
                    icon={faDownload}
                  />{" "}
                  {props?.ItemsProject?.downloadAPK}
                </p>
              </Link> </div>
            )}
           
            {props?.ItemsProject?.urlProject[0] && (
              <div className="col-md-6"><Link
                href={props?.ItemsProject?.urlProject[0]}
                rel="preload"
                target="blanc">
                {" "}
                <p className="text-center">
                  {" "}
                  <FontAwesomeIcon
                    className="project-details-link"
                    icon={faCode}
                  />{" "}
                  {props?.ItemsProject?.codeSource}
                </p>
              </Link></div>
            )}</div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDelails;
