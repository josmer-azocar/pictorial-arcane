import './Loading.css';

function Loading() {

    return (<div id="loading-container">
        <div id="spinner">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
        </div>
        <div id="loading-text">
            <p>Esperando respuesta</p>
        </div>
    </div>);

    
}

export default Loading