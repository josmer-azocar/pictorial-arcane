import './Dashboard.css'
import { fetchPurchases } from '../../services/fetchPurchases';
import { useState } from 'react';
import Loading from '../../components/Loading';
import { useEffect } from 'react';

function HistorialCompras() {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadPurchases = async () => {
            setLoading(true);
            try {
                const data = await fetchPurchases();
                console.log("Compras obtenidas:", data);
                setPurchases(data.content || []);
            } catch (error) {
                setPurchases([]);
                console.error("Error fetching purchases:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPurchases();
    }, []);

    if (loading) {
        return <Loading />;
    }
    return(
        <section>
            <h3>Compras:</h3>
            <table className="purchases-table">
                <thead>
                    <tr>
                        <th>Obra</th>
                        <th>Fecha de Compra</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {purchases.map((purchase) => (
                        <tr key={purchase.idSale}>
                            <td>{purchase.artworkTitle}</td>
                            <td>{new Date(purchase.date).toLocaleDateString()}</td>
                            <td>${purchase.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );  
}

export default HistorialCompras