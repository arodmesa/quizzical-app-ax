
function Questions ({datos, id, handleDiv,opciones}){
    function decodeHTML(html) {
        let txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };
    
    let arreglo_div =opciones.map((texto,index)=>{
        return(
                <div className={`q_options ${(datos.correct_answer===texto)?'correcta':'incorrecta'}`} key={index} id={`${id}${index}`} onClick={(event)=>handleDiv(event,(datos.correct_answer===texto)?'correcta':'incorrecta')}>
                    <p className="p_answers">{decodeHTML(texto)}</p> 
                </div>
            );
    })
    return(
        <div className='div_q'>
            <h2 className='h2_labels'>{decodeHTML(datos.question)}</h2>
            <div className="div_respuestas">
                {arreglo_div}
            </div>
           
        </div>
    )
}
export default Questions