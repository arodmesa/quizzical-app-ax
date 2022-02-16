function BotonFinal(props){
    return(
        <div className='div_final'>
            <p className='texto_final'>{props.texto}</p>
            <button type='button' className='boton_final' onClick={()=>props.handleButton((props.window===2)?2:3)}>{(props.window===2)?'Check Answers':'Play Again!!!'}</button>
        </div>
        
    );
}
export default BotonFinal