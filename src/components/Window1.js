function Window1(props){
    return(
        <div id='div-v1'>
            <h1>Quizzical</h1>
            <p>Welcome to this anime and manga quiz app</p>
            <button type='button' className='botones' onClick={(e)=>props.handleButton(1)}>Start Quiz</button>
        </div>
    );
}
export default Window1