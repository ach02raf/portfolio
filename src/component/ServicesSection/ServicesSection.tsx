import React from 'react'
interface ServiceItem {
    id: number;
    title: string;
    desc: string;
    img: string;
  }
  
function ServicesSection(props: {
    ServicesSection: {
      title: string;
      description: string;
      listServices:ServiceItem[],
    };
  }) {
  return (
    <div><h2>{props?.ServicesSection?.title}</h2>
    <p>{props?.ServicesSection?.description}</p>
  <div className='row'>  {props?.ServicesSection?.listServices?.map((item,index)=>(
    <div className='col' key={index}>
        <img src={`/Images/${item?.img}.jpg`} alt={item?.title} title={item?.title} />
        <h3>{item?.title}</h3>
        <p>{item?.desc}</p>
    </div>
))

}</div></div>
  )
}

export default ServicesSection