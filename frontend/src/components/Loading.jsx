import './Loading.css';

function Loading() {

    return (<div id="loading-container">
        <div id="spinner">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
        </div>
        <div id="loading-text">
            <p>Esperando respuesta</p>
        </div>
    </div>);

    
}

export default Loading