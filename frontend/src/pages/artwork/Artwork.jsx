import React, { useState, useEffect } from "react";
import { showArtwork, showArtist } from '../../services/fetchArtwork.js'
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import './Artwork.css'


function Artwork() {
    const [works, setWork] = useState({ content: [], totalPages: 0, number: 0});
    const [load, isLoad] = useState(false);
    const [error, setError] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc', genre: ' ' });
    const [availableArtists, setAvailableArtists] = useState([]);
    const [availableGenres, setAvailableGenres] = useState([]);

    const getArt = async (page = 0, sortBy = sortConfig.key, dir = sortConfig.direction, genre_ = sortConfig.genre) => {
        isLoad(true);
        try {


            setError("");
            const response = await showArtwork(page, sortBy, dir, genre_);
            const artistData = await showArtist();

            const artAndArtist = response.content.map(art => {
                const artist = artistData.find(a => a.id === art.id_artist);
                return {
                    ...art,
                    artistName: artist ? artist.name : "Desconocido",
                    artistId: artist ? artist.id : 0,
                    genre: art.genre || "General"
                };
            });
            setWork({
                ...response,
                content: artAndArtist
            });
            setSortConfig({ key: sortBy, direction: dir, genre: genre_ });
            setAvailableArtists(artistData);

            const uniqueGenres = [...new Set(artAndArtist.map(item => item.genre))]; //el Set elimina datos duplicados
            setAvailableGenres(uniqueGenres);

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
            <div id="titulo-galeria">
                <p>GALERÍA</p>
            </div>
            <div id="sort-galery">
                <p>Filtrar por: </p>
                <div id="botton-filtrado">
                    <button onClick={() => getArt(0, 'precio', sortConfig.direction === 'asc' ? 'desc' : 'asc')}>
                        Precio {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </button>{/*menor a mayor*/}
                    <select 
                        value={sortConfig.key === 'id_artist' ? sortConfig.genre : ''} 
                        onChange={(e) => getArt(0, 'id_artist', 'asc', e.target.value)}>
                        <option value="">Todos los Artistas</option>
                        {availableArtists.map(artist => (
                            <option key={artist.id} value={artist.id}>
                                {artist.name}
                            </option>
                        ))}
                    </select>

                    <select 
                        value={sortConfig.genre} 
                        onChange={(e) => getArt(0, sortConfig.key, sortConfig.direction, e.target.value)}>
                        <option value="">Todos los Géneros</option>
                        {availableGenres.map((genre, index) => (
                            <option key={index} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>

                    <button onClick={() => getArt(0, '', 'asc', '')}>Limpiar</button>
                </div>
            </div>
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