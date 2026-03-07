import './Reports.css'
import { useState } from 'react';
import { getSoldArtworks } from '../../services/salesServices';
import Loading from '../../components/Loading';

/*
- Consultas:
    - Listado de obras vendidas en un periodo dado por el usuario
    - Resumen de facturación dado un periodo (código de factura, fecha, precio de la
obra, ganancia del museo (en porcentaje y en dólares) , total recaudado)
    - Resumen de membresías dado un período
*/

function Reports() {

    const [activeReport, setActiveReport] = useState(null); //obras vendidas - facturación - membresías
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!startDate || !endDate) {
            alert("Por favor, seleccione ambas fechas.");
            return;
        }

        setLoading(true);
        try {
            // añadir switch
            const result = await getSoldArtworks(startDate, endDate);
            setData(result);
        } catch (error) {
            console.error("Error al obtener el reporte:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderReportContent = () => {
        if (loading) return <Loading />
        //if (data.length === 0) return <p>No hay datos para el periodo seleccionado.</p>;
        if (!activeReport) return <p className="select-prompt">Selecciona un tipo de reporte para comenzar.</p>;

        switch (activeReport) {
            case 'sold':
                if (data.length === 0) {
                    return <p>No hay datos para el periodo seleccionado.</p>;
                } else {
                return (
                    <div className="report-view">
                        <h3>Listado de Obras Vendidas</h3>
                        {/* Table logic for Sold Artworks */}
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Obra</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((sale) => (
                                    <tr key={sale.idSale}>
                                        <td>{sale.date}</td>
                                        <td>{sale.artWork?.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )};
            case 'billing':
                return (
                    <div className="report-view">
                        <h3>Resumen de Facturación</h3>
                        <p>Total Recaudado | Ganancia Museo | Impuestos</p>
                        {/* Table logic for Billing using SaleEntity fields like profitAmount and taxAmount */}
                    </div>
                );
            case 'memberships':
                return (
                    <div className="report-view">
                        <h3>Resumen de Membresías</h3>
                        {/* Logic for memberships here */}
                    </div>
                );
            default:
                return null;
        }
    };

    return(
        <section id='reports-container'>
            <p className="admin-eyebrow">Panel de Control</p>
            <h2 className="admin-title">Reportes Administrativos</h2>

            <div id='report-lists'>
                <ul className="report-tabs">
                    <li>
                        <button 
                            className={activeReport === 'sold' ? 'active' : ''} 
                            onClick={() => setActiveReport('sold')}>
                            Obras Vendidas
                        </button>
                    </li>
                    <li>
                        <button
                            className={activeReport === 'billing' ? 'active' : ' '}
                            onClick={() => setActiveReport('billing')}>
                            Resumen de facturazión
                        </button>
                    </li>
                    <li>
                        <button
                            className={activeReport === 'memberships' ? 'active' : ''} 
                            onClick={() => setActiveReport('memberships')}>
                            Resumen de Membresías
                        </button>
                    </li>
                    
                </ul>
            </div>
            {activeReport && (
                <div className="date-picker-container">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                    <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
                        Generar
                    </button>
                </div>
            )}

            <div id="report-display-area">
                {renderReportContent()}
            </div>
        </section>
    );
}

export default Reports