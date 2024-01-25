import React from 'react';

const ClienteTable = ({ clientes }) => (
	<table>
		<thead>
		<tr>
			<th>ID</th>
			<th>Nome</th>
			<th>Email</th>
			<th>Telefone</th>
			<th>Coordenada X</th>
			<th>Coordenada Y</th>
		</tr>
		</thead>
		<tbody>
		{clientes.map((cliente) => (
			<tr key={cliente.id}>
				<td>{cliente.id}</td>
				<td>{cliente.nome}</td>
				<td>{cliente.email}</td>
				<td>{cliente.telefone}</td>
				<td>{cliente.coordx}</td>
				<td>{cliente.coordy}</td>
			</tr>
		))}
		</tbody>
	</table>
);

export default ClienteTable;
