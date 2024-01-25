function calcularDistancia(pontoA, pontoB) {
  return Math.sqrt(Math.pow(pontoB.coordx - pontoA.coordx, 2) + Math.pow(pontoB.coordy - pontoA.coordy, 2));
}

function calcularRota(clientes) {
  if (clientes.rows.length <= 1) {
    return clientes.rows.map(cliente => cliente.id);
  }

  let melhorRota = null;
  let menorDistancia = Number.MAX_VALUE;

  // Gere todas as permutações possíveis das visitas
  const permutacoes = permutacao(clientes.rows.map(cliente => cliente.id));

  // Para cada permutação, calcule a distância total
  permutacoes.forEach(permutacaoAtual => {
    let distanciaTotal = 0;

    for (let i = 0; i < permutacaoAtual.length - 1; i++) {
      const clienteAtual = clientes.rows.find(cliente => cliente.id === permutacaoAtual[i]);
      const proximoCliente = clientes.rows.find(cliente => cliente.id === permutacaoAtual[i + 1]);
      distanciaTotal += calcularDistancia(clienteAtual, proximoCliente);
    }

    // Se a distância total for menor, atualize a melhor rota
    if (distanciaTotal < menorDistancia) {
      menorDistancia = distanciaTotal;
      melhorRota = [...permutacaoAtual];
    }
  });

  return melhorRota.map(clienteId => clientes.rows.find(cliente => cliente.id === clienteId));
}

// Função para gerar permutações de uma lista
function permutacao(lista) {
  if (lista.length <= 1) {
    return [lista];
  }

  const resultado = [];

  for (let i = 0; i < lista.length; i++) {
    const elementoAtual = lista[i];
    const resto = lista.slice(0, i).concat(lista.slice(i + 1));
    const permutacoesRestantes = permutacao(resto);

    for (const permutacaoRestante of permutacoesRestantes) {
      resultado.push([elementoAtual, ...permutacaoRestante]);
    }
  }

  return resultado;
}

module.exports = { calcularRota };

