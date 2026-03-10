import './Reports.css'
import { searchMemberships } from '../../services/membershipServices'
import { useState } from 'react';
import Loading from '../../components/Loading';

function ReportsSearch() {
    const [searchParams, setSearchParams] = useState({
        startDate: '',
        endDate: '',
        status: ''
    });
    const [results, setResults] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);

    const handleSearch = async (e) => {
        e?.preventDefault();
        setLoading(true);
        try {

            const effectiveStart = searchParams.startDate || '1900-01-01';
            const effectiveEnd = searchParams.endDate || '2100-01-01';
            const searchData = await searchMemberships(
                effectiveStart,
                effectiveEnd,
                "ACTIVE",
                page,
                10);
            setResults(searchData.content);
            console.log("Resultados de búsqueda membresia:", searchData);
            
        } catch (error) {
            console.error("Error Buscando las membresias:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="reports-search">
            <h3>Gestión de Membresías</h3>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="date"
                    value={searchParams.startDate}
                    onChange={(e) => setSearchParams({...searchParams, startDate: e.target.value})}
                />
                <input
                    type="date"
                    value={searchParams.endDate}
                    onChange={(e) => setSearchParams({...searchParams, endDate: e.target.value})}
                />
                <select
                    value={searchParams.status}
                    onChange={(e) => setSearchParams({...searchParams, status: e.target.value})}
                >
                    <option value="">Todos los estados</option>
                    <option value="ACTIVE">Activa</option>
                    <option value="EXPIRED">Expirada</option>
                    <option value="CANCELED">Cancelada</option>
                </select>
                <button type="submit" disabled={loading}>Buscar</button>
            </form>

            {loading && <Loading />}
            {results && (
                <>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Usuario</th>
                                <th>Fecha inicio</th>
                                <th>Fecha fin</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(m => (
                                <tr key={m.idMembership}>
                                    <td>{m.idMembership}</td>
                                    <td>{m.clientId}</td>
                                    <td>{m.paymentDate}</td>
                                    <td>{m.expiryDate}</td>
                                    <td>{m.status}</td>
                                    <td>
                                        <button>Renovar</button>
                                        <button>Cancelar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default ReportsSearch