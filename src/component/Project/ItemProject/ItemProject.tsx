"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "./ItemProject.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faLink } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Locale } from "../../../../i18n-config";
function ItemProject(props: {
  ItemsProject: {
    id: string;
    nameProject: string;
    slug:string;
    title: string;
    descProject: string;
    imgProject: string[];
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
  };
  lang: Locale;
}) {
 
  return (
      <div className="row itemProject">
         <Link href={`/${props?.lang}/Projects/${props?.ItemsProject?.slug}`}>
        <div
          className="itemProject-img d-block m-auto p-0"
        >
          {props?.ItemsProject?.imgProject[0] && (
            <Image
              src={`/Images/${props?.ItemsProject?.imgProject[0]}.png`}
              alt={props?.ItemsProject?.imgProject[0]}
              title={props?.ItemsProject?.imgProject[0]}
              height={512}
              width={512}
            />
          )}
        

          {props?.ItemsProject?.urlSITE[0] && (
            <div>
              {" "}
              <h3 className="text-center py-3 px-2">
                {" "}
                <FontAwesomeIcon
                  className="itemProject-link"
                  icon={faLink}
                />{" "}
                {props?.ItemsProject?.nameProject}
              </h3>
            </div>
          )}
          {props?.ItemsProject?.apk && (
            <div>
              {" "}
              <h3 className="text-center py-3 px-2">
                {" "}
                <FontAwesomeIcon
                  className="itemProject-link"
                  icon={faDownload}
                />{" "}
                {props?.ItemsProject?.nameProject}
              </h3>
            </div>
          )}
          {!props?.ItemsProject?.apk && !props?.ItemsProject?.urlSITE[0] && (
            <h3 className="text-center py-3 px-2">
              {props?.ItemsProject?.nameProject}
            </h3>
          )}
        </div>
        </Link>
      </div>
  
  );
}

export default ItemProject;
