import React, { useState, useEffect } from "react";
import { showArtwork, showArtist } from '../../services/fetchArtwork.js'
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import './Artwork.css'


function Artwork() {
    const [works, setWork] = useState([]);
    const [load, isLoad] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const getArt = async () => {
            isLoad(true);
            try {


                setError("");
                const data = await showArtwork();
                const artistData = await showArtist();

                const artAndArtist = data.map(art => {
                    const artist = artistData.find(a => a.id === art.id_artist);
                    return {
                        ...art,
                        artistName: artist ? artist.name : "Desconocido",
                        artistId: artist ? artist.id : 0
                    };
                });
                setWork(artAndArtist);
                console.log("fetch exitoso", data);

            } catch (error) {
                console.error("Connection failed:", error);
                setError("No se pudo mostrar. Error del servidor");

            } finally {
                isLoad(false);
            }
        }
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
                {works.map((artPiece) => (
                    <div className="art-piece" key={artPiece.id}>
                        <img src={artPiece.image} alt={artPiece.description} />
                        <div className="text-art-piece">
                            <p>{artPiece.name}</p>
                            <p><Link to={`/artist/${artPiece.artistId}`}>{artPiece.artistName}</Link></p>
                        </div>
                    </div>
                ))}
            </section>

        </section>
    );
}

export default Artwork