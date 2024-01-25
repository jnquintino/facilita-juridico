import React, { useState, useEffect } from 'react';
import './App.css';
import ClienteTable from './components/ClienteTable';
import ClienteForm from './components/ClienteForm';
function App() {
    const apiUrl = 'http://localhost:3001';
    const [clientes, setClientes] = useState([]);
    const [filtro, setFiltro] = useState('');

    // Função para buscar clientes do backend
    const fetchClientes = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/clientes`);
            const data = await response.json();
            setClientes(data);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        }
    };

    useEffect(() => {
        // Chamando a função de busca ao montar o componente
        fetchClientes();
    }, []);

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
    };

    const handleCalcularRotas = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/rota`);
            const data = await response.json();
            setClientes(data);
        } catch (error) {
            console.error('Erro ao buscar clientes com rota otimizada:', error);
        }
    };

    const handleClienteCadastro = async (novoCliente) => {
        try {
            const response = await fetch(`${apiUrl}/api/clientes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoCliente),
            });

            if (response.ok) {
                fetchClientes();
            } else {
                console.error('Erro ao cadastrar cliente:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
        }
    };

    const filteredClientes = clientes.filter((cliente) =>
        cliente.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div className="App">
            <h1>Gerenciamento de Clientes</h1>
            <ClienteForm onClienteCadastro={handleClienteCadastro}/>
            <label>Filtrar por Nome: </label>
            <input type="text" value={filtro} onChange={handleFiltroChange}/>
            <ClienteTable clientes={filteredClientes}/>
            <p>
                <button onClick={handleCalcularRotas}>Calcular Rota Otimizada</button>
            </p>
        </div>
    );
}

export default App;
