import Box from "./Box"
///// Acá voy a setear la grilla y asignarle a box las props que recibo de la app. Estas props me van a permitir manejar las coordenadas y manipular el estado del array
///// que se modifica con cada play.
const Grid =({cols, rows, grilla, selectBox})=>{
    const width=cols*16;
    const rowsArr=[];
    var boxClass="";
    for (let i = 0; i<rows; i++){
        for (let j = 0; j<cols; j++){
          let boxId=i+"_"+j;
          boxClass=grilla[i][j] ? "box on" : "box off";
          rowsArr.push(
            <Box 
            boxClass={boxClass}
            key={boxId}
            row={i}
            col={j}
            id={boxId}
            selectBox={selectBox}
            />
          )
        }
      }
    return(
      <div className="grid" style={{width:width}}>
        {rowsArr}
      </div>
    )
  }

  export default Grid;