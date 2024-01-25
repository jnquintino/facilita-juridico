import React, { useState } from 'react';

const ClienteForm = ({ onClienteCadastro }) => {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [telefone, setTelefone] = useState('');
	const [coordX, setCoordX] = useState('');
	const [coordY, setCoordY] = useState('');

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const novoCliente = {
			nome,
			email,
			telefone,
			coordX: coordX,
			coordY: coordY,
		};

		// Chama a função de callback para o cadastro
		onClienteCadastro(novoCliente);

		// Limpar os campos após o cadastro
		setNome('');
		setEmail('');
		setTelefone('');
		setCoordX('');
		setCoordY('');
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<h2>Cadastrar Novo Cliente</h2>
			<label>Nome:</label>
			<input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />

			<label>Email:</label>
			<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

			<label>Telefone:</label>
			<input type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />

			<label>Coordenada X:</label>
			<input type="number" value={coordX} onChange={(e) => setCoordX(e.target.value)} required />

			<label>Coordenada Y:</label>
			<input type="number" value={coordY} onChange={(e) => setCoordY(e.target.value)} required />

			<button type="submit">Cadastrar</button>
		</form>
	);
};

export default ClienteForm;
