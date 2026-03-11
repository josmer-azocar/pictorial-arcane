import './Reports.css'
import { useState } from 'react';
import { getSoldArtworks } from '../../services/salesServices';
import { fetchSoldArtwork, fetchPaidArtwork } from '../../services/fetchSoldArtwork';
import Loading from '../../components/Loading';
import ReportsSearch from './ReportsSearch';

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
    const [ billingData, setBillingData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        const effectiveStart = startDate || '1900-01-01';
        const effectiveEnd = endDate || new Date().toISOString().split('T')[0];

        setLoading(true);
        try {
            // añadir switch
            const paidArtList = await fetchPaidArtwork(effectiveStart, effectiveEnd);
            setData(paidArtList.content);
            const billing = await fetchSoldArtwork(effectiveStart, effectiveEnd);
            console.log("Datos de ventas:", billing);
            console.log("Datos de obras pagadas:", paidArtList);
            setBillingData(billing);

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
                                    <th>Obra</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((sale) => (
                                    <tr key={sale.idArtWork}>
                                        <td>{sale?.name || "sin definir"}</td>
                                        <td>{sale.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )};
            case 'billing':
                if (!billingData) return <p>No hay datos de facturación.</p>;

                return (
                    
                    <div className="report-view">
                        <h3>Resumen de Facturación</h3>
                        <p>Total Recaudado | Ganancia Museo | Impuestos</p>
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>Código de Factura</th>
                                    <th>Fecha</th>
                                    <th>Obra</th>
                                    <th>Precio ($)</th>
                                    <th>Ganancia del Museo ($)</th>
                                    <th>Ganancia del Museo (%)</th>
                                    <th>Pago total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billingData.sales.map((sale) => (
                                    <tr key={sale.invoiceCode}>
                                        <td>{sale.invoiceCode}</td>
                                        <td>{sale.date}</td>
                                        <td>{sale.artWork?.name}</td>
                                        <td>{sale.artworkPrice}</td>
                                        <td>{sale.museumProfitAmount}</td>
                                        <td>{sale.museumProfitPercentage}</td>
                                        <td>{sale.totalPaid}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="report-summary-footer">
                            <div className="summary-item">
                                <span>Total Recaudado:</span>
                                <strong>${billingData.totalCollected.toLocaleString()}</strong>
                            </div>
                            <div className="summary-item">
                                <span>Ganancia Neta Museo:</span>
                                <strong>${billingData.totalMuseumProfit.toLocaleString()}</strong>
                            </div>
                        </div>
                    </div>
                );
            case 'memberships':
                return (
                    <ReportsSearch/>
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
            {activeReport && (activeReport === 'sold' || activeReport === 'billing') && (
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