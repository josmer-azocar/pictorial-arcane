import React, { useState } from 'react';
import './Admin.css';
import FormSculpture from './FormSculpture.jsx';
import FormPainting from './FormPainting.jsx';
import FormPhotography from './FormPhotography.jsx';
import FormCeramics from './FormCeramics.jsx';
import FormGoldsmithing from './FormGoldsmithing.jsx';

const CreateArtwork = () => {
    const [selectedType, setSelectedType] = useState(null);

    const artworkTypes = [
        { id: 'SCULPTURE', label: 'Escultura', icon: '🗿' },
        { id: 'PHOTOGRAPHY', label: 'Fotografía', icon: '📷' },
        { id: 'CERAMICS', label: 'Cerámica', icon: '🏺' },
        { id: 'GOLDSMITHING', label: 'Orfebrería', icon: '💍' },
        { id: 'PAINTING', label: 'Pintura', icon: '🎨' }
    ];

    const handleSelect = (type) => {
        setSelectedType(type);
        // Aquí conectaremos con el formulario específico más adelante
        console.log("Tipo seleccionado:", type);
    };

    const renderForm = () => {
        switch (selectedType) {
            case 'SCULPTURE':
                return <FormSculpture />;
            case 'PAINTING':
                return <FormPainting />;
            case 'PHOTOGRAPHY':
                return <FormPhotography />;
            case 'CERAMICS':
                return <FormCeramics />;
            case 'GOLDSMITHING':
                return <FormGoldsmithing />;
            default:
                return <p>Formulario no encontrado.</p>;
        }
    };

    return (
        <div className="admin-form-container" style={{ maxWidth: '800px' }}>
            <h1 className="admin-title">Crear Nueva Obra</h1>
            <div className="admin-line"></div>
            
            {!selectedType ? (
                <>
                    <p className="admin-subtitle">
                        Seleccione la categoría de la obra que desea registrar en el sistema.
                    </p>
                    <div className="artwork-types-grid">
                        {artworkTypes.map((type) => (
                            <div 
                                key={type.id} 
                                className="artwork-type-card"
                                onClick={() => handleSelect(type.id)}
                            >
                                <div className="artwork-type-icon">{type.icon}</div>
                                <span className="artwork-type-label">{type.label}</span>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="fade-in">
                    <button className="btn-secondary" onClick={() => setSelectedType(null)} style={{ marginBottom: '20px' }}>
                        ← Volver a Categorías
                    </button>
                    {renderForm()}
                </div>
            )}
        </div>
    );
};

export default CreateArtwork;