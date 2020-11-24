import './App.css';
import React, {useEffect, useState, useRef} from "react"
import Grid from "./components/Grid"

const App=() => {
  
  
  

  const intervalRef=useRef();


  //inicializo estados que determinan velocidad y tamaño para que el usuario pueda modificarlos con los inputs;
  const [cols, setCols]=useState(50);
  const [rows, setRows]=useState(30);
  const [velocidad, setVelocidad]=useState(500)
  

  const [grilla, setGrilla]=useState( Array(rows).fill().map(() => Array(cols).fill(false)) )
  const [running, setRunning]=useState(false)
 
   const selectBox=(row, col)=>{
    let copiaGrilla=arrayClone(grilla)
    copiaGrilla[row][col]=!copiaGrilla[row][col];
    setGrilla(copiaGrilla);
  }

  useEffect(() => {
    const id = setInterval(() => {
      if(running) play();
    }, velocidad);
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

//// La función play() es la que define las reglas del juego

const play =function(){
  let g = grilla;
  let g2 = arrayClone(grilla);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let count = 0;
      
      /// si i es mayor al fin de las rows, evalúo para "arrriba"
      if (i > 0) {
        if (g[i - 1][j]) count++;
        if (j > 0 && g[i - 1][j - 1]) count++;
        if (j < cols - 1 && g[i - 1][j + 1]) count++;
        if (i === rows - 1){
         if (g[0][j]) count++;
         if (g[0][j+1]) count++;
         if (g[0][j-1]) count++;
       } 
     }
    
    /// si i es menor al fin de las rows, evalúo para "abajo"
     if (i < rows - 1){
         if (g[i + 1][j]) count++;
         if (j > 0 && g[i + 1][j - 1]) count++;
         if (j < cols - 1 && g[i + 1][j + 1]) count++;
         if (i === 0) {
           if (g[rows - 1][j]) count++;
           if (g[rows - 1][j+1]) count++;
           if (g[rows - 1][j-1]) count++;
           if (j === 0 && g[rows-1][cols - 1]) count++;
           if (j === cols - 1 && g[rows - 1][0]) count++;
       
          }
       }
///si j es menor que el fin de las columnas, evalúo para la derecha

if (j < cols - 1){
  if(g[i][j + 1]) count++;
  if (j > 0 && g[i][j - 1]) count++;
  if(j===0){
    if (g[i][cols-1]) count++;
    if (g[i+1] && g[i+1][cols-1]) count++;
    if (g[i-1] && g[i-1][cols-1]) count++;
    if (i === 0 && g[rows-1][cols - 1]) count++;
    if (i === rows - 1 && g[0][cols-1]) count++;
    }
  }

  
///si j es mayor que el principio de las columnas, evalúo para la izquierda

  if(j===cols-1){
    if (g[i][0]) count++;
    if (g[i+1] && g[i+1][0]) count++;
    if (g[i-1] && g[i-1][0]) count++;
    if (i === 0 && g[rows-1][0]) count++;
    if (i === rows - 1 && g[0][0]) count++;
  }
      if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
      if (!g[i][j] && count === 3) g2[i][j] = true;
      
    }
  }
  
  setGrilla(g2);
}

////playButton setea el intervalo que utiliza una referencia externa del id de los intervalos para evitar conflictos con la re-renderización

const playButton=() => {
 setRunning(!running)
  clearInterval(intervalRef.current)
}

return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <div style={{textAlign:"center"}}>
      <button onClick={()=>playButton()}>{running? "Parar" : "Comenzar"}</button>
      <button onClick={()=>play()}>Avanzar 1 paso</button>
      <div>
      <input disabled={running ? true : false} type="number" onChange={(e)=>setVelocidad(e.target.value)} placeholder="Setear velocidad en ms"/>

      </div>
      <div>
      <input disabled={running ? true : false} type="number" onChange={(e)=>setCols(e.target.value)} placeholder="Setear ancho"/>
      </div>
      <div>
      <input disabled={running ? true : false} type="number" onChange={(e)=>setRows(e.target.value)} placeholder="Setear alto"/>
      </div>
      </div>
        
        


      
      
      
      <Grid selectBox={selectBox} cols={cols} rows={rows} grilla={grilla}/>   
    </div>
  );
}

function arrayClone(arr){
  return JSON.parse(JSON.stringify(arr));
}

export default App;
