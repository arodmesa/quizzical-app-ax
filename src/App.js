//import './App.css';
import Window1 from "./components/Window1";
import Questions from "./components/Questions";
import React, { useState } from 'react'
import BotonFinal from "./components/Boton_final";

function App() {
  const [q_data,set_q_data]=React.useState('');
  const [opciones,setOpciones]=useState([]);
  const [state,setState]=React.useState({
    window:1,
    play_again:0
  });
  const [resultados,setResultado]=React.useState({
    correctas:[0,0,0,0,0]
            
  });
  const [texto,setTexto]=React.useState('');
  
  React.useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=5&category=31&type=multiple')
    .then(res=>res.json())
    .then(data=>{
      set_q_data(()=>data);
      let temp=data.results.map((dato)=>{
        let dato_temp=[dato.correct_answer, dato.incorrect_answers[0],dato.incorrect_answers[1],dato.incorrect_answers[2]];
        return(
          dato_temp.sort(()=> { return Math.random() - 0.5 })
        );
      })
      setOpciones(temp);      
    })
    
  },[state.play_again]) 

  function handleButton(id){
    switch (id){
      case 1 :
        setState(prevState=>{
          return{
            ...prevState,
            window:2
          }
        }
        )
        break;
        case 2:
          let elementos=document.getElementsByClassName('select incorrecta');
          elementos=[].slice.call(elementos);// convirtiendo de html collections a array
          elementos.map((elemento)=>elemento.classList.add('rojo'));
          elementos=document.getElementsByClassName('correcta');
          elementos=[].slice.call(elementos);// convirtiendo de html collections a array
          elementos.map((elemento)=>elemento.classList.add('verde'));
                            
          const reducer = (previousValue, currentValue) => previousValue + currentValue;
          let resp=resultados.correctas.reduce(reducer);
          setState((prevState)=>{
            return{
              ...prevState,
              window:3
            }
          })
          setTexto((resp===5)?'Congratulations!!!! Answers 5/5':`Answers ${resp}/5`)
          break;
        case 3:
          setState((prevState)=>{
            return{
              window:2,
              play_again: prevState.play_again+1
            };
          })
          setResultado({
            correctas:[0,0,0,0,0],
            
          });
          setTexto('');
          let elementos_borrar=document.getElementsByClassName('rojo');
          elementos_borrar=[].slice.call(elementos_borrar);// convirtiendo de html collections a array
          elementos_borrar.map((elemento)=>elemento.classList.remove('rojo'));
          elementos_borrar=document.getElementsByClassName('select');
          elementos_borrar=[].slice.call(elementos_borrar);// convirtiendo de html collections a array
          elementos_borrar.map((elemento)=>elemento.classList.remove('select'));
          break;
        default:
          break;
      

      
    }
  }

  function handleDiv(event, respuesta){
    let element_id=event.target.id===''?event.target.parentElement.id:event.target.id;
    if (state.window===2){
      let temp;
      for(let i=0;i<4;i++){
        if (`${element_id.substring(0,element_id.length - 1)}${i}`===element_id){
          continue;
        }
        temp=document.getElementById(`${element_id.substring(0, element_id.length - 1)}${i}`);
        temp.classList.remove('select');
      }
      temp=document.getElementById(element_id);
      temp.classList.add('select');
      setResultado((prevResultado)=>{
        let temp=prevResultado.correctas.slice();
        temp[parseInt(element_id.substring(0, element_id.length - 1))]=(respuesta==='correcta')? 1:0;
        return{
          ...prevResultado,
          correctas: temp
        }
      })
      
     
    }
    
  }

  
  var preguntas_arr;
  modifyArray();
  function modifyArray() {
    
    if (q_data!==''){
      preguntas_arr=q_data.results.map((dato,index)=>{
        return(
        <Questions datos={dato} key={index} id={index} handleDiv={handleDiv} opciones={opciones[index]} />
        );
      });
    }
    
  }
 
 
 
  return (
    <div className="App">
      {state.window===1?<Window1 handleButton={handleButton}/>:<div className="ventanas">
          {preguntas_arr}
        </div>}
      {state.window===1?<div></div>:<BotonFinal texto={texto} handleButton={handleButton} window={state.window}/>}
    </div>
  );
}

export default App;
