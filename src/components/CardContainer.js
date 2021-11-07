import { useEffect, useState } from 'react';


const CardContainer = ({children, userIsNew}) => {
  useEffect(() => { 
    
  }, []);
  return (
    <div className={`card animate__animated  animate__fadeIn
    
    ${ userIsNew ?'':'min-height-350' }
    `}>
     {
         children
     }
    </div>
  );
};


export default CardContainer;