import React, { useState, useEffect } from "react";
import { showArtwork, showArtist } from '../../services/fetchArtwork.js'
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import './Artwork.css'


function Artwork() {
    const [works, setWork] = useState({ content: [], totalPages: 0, number: 0});
    const [load, isLoad] = useState(false);
    const [error, setError] = useState("");

    const getArt = async (page = 0) => {
        isLoad(true);
        try {


            setError("");
            const response = await showArtwork(page);
            const artistData = await showArtist();

            const artAndArtist = response.content.map(art => {
                const artist = artistData.find(a => a.id === art.id_artist);
                return {
                    ...art,
                    artistName: artist ? artist.name : "Desconocido",
                    artistId: artist ? artist.id : 0
                };
            });
            setWork({
                ...response,
                content: artAndArtist
            });

            console.log("fetch exitoso", response);

        } catch (error) {
            console.error("Connection failed:", error);
            setError("No se pudo mostrar. Error del servidor");

        } finally {
            isLoad(false);
        }
    }

    useEffect(() => {
        getArt();

    }, []); // el array vacío hace que se renderize solo una vez

    if (load) {
        return <Loading />
    }

    if (error) {
        return (
            <p>Error: {error}</p>
        );
    }

    return (
        <section id="art-display">
            
            <section id="art-grid">
                {(works.content || []).map((artPiece) => (
                    <div className="art-piece" key={artPiece.id}>
                        <img src={artPiece.image} alt={artPiece.description} />
                        <div className="text-art-piece">
                            <p className="precio-display">${artPiece.precio}</p>
                            <p>{artPiece.name}</p>
                            <p><Link to={`/artist/${artPiece.artistId}`}>{artPiece.artistName}</Link></p>
                        </div>
                    </div>
                ))}
            </section>
            <section className="pagination">
                {[...Array(works.totalPages || 0)].map((unused, index) => ( //el spread... se hace para forzar a que se lea el array y que map pueda ver los valores como undefined
                    <button key={index} onClick={ () => getArt(index)} 
                        className={works.number === index ? "active-page" : ""}>
                        {index + 1}
                    </button>
                ))}
            </section>

        </section>
    );
}

export default Artwork