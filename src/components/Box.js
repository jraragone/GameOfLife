import React from "react";


const Box=({boxClass, id, row, col, selectBox})=>{
    const select = ()=>{
      selectBox(row, col)
    }
    
    return(
      <div onClick={select} className={boxClass} id={id}/>
    )
  }

  export default Box;