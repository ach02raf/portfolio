import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { fas } from '@fortawesome/free-solid-svg-icons';
import "./ServicesSection.scss"
import React from 'react';
interface ServiceItem {
  id: number;
  title: string;
  desc: string;
  img: string;
}

interface ServicesSectionProps {
  ServicesSection: {
    title: string;
    description: string;
    listServices: ServiceItem[];
  };
}

function ServicesSection(props: ServicesSectionProps) {
  return (
    <div className='service-section'>
      <h2>{props?.ServicesSection?.title}</h2>
      <p>{props?.ServicesSection?.description}</p>
      <div className='row m-0'>
        {props?.ServicesSection?.listServices?.map((item, index) => (
          <div className='col-lg-4 col-md-6 position-relative justify-content-start' key={index}>
        <div className='row align-items-end my-2'><div className='col-3'> <div className='service-section-icon'>   <FontAwesomeIcon color='white' icon={fas[item?.img] as IconDefinition} /></div></div><div className='col-9'>  <h3>{item?.title}</h3></div></div>   
            <p>{item?.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesSection;
