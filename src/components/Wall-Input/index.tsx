import React, { useState } from 'react';
import './styles.css';

interface label {
  label1:string;
  label2:string;
  placeholder1:string;
  placeholder2:string;
  name1: string;
  name2: string;
  id1: string;
  id2: string;
}

function Wall({label1, label2, placeholder1, placeholder2, name1, name2, id1, id2}:label) {
 
  return (  
    <>
      
                    
        <div className='content-input'>
            <div className="content-input-form">
                <label>{label1}</label>
                <input type="text" placeholder={placeholder1} name={name1} id={id1}></input>
            </div>
            <div className="content-input-form">
                <label>{label2}</label>
                <input type="text" placeholder={placeholder2} name={name2} id={id2} ></input>
            </div>
        </div>

                
    </>

  );
}

export default Wall;