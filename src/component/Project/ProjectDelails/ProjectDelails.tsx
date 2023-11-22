import React from 'react'
import "./ProjectDelails.scss"
function ProjectDelails(props:{
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
  return (
    <div className='project-details '>{props?.ItemsProject.nameProject}</div>
  )
}

export default ProjectDelails