const buscaCidade = document.getElementById('cidade-form')


buscaCidade.addEventListener('submit', async (event) => {
    event.preventDefault();

    const cidadeProcurada = document.getElementById('cidade-procurada').value

    if (!cidadeProcurada) {
        alert('Por favor, digite o nome de uma cidade.');
        return;
    }

    try {

        const response = await fetch(`http://localhost:3000/previsao/${cidadeProcurada}`);

        const data = await response.json()

        if (response.ok) {
            console.log('Dados recebidos com sucesso:', data)
            previsao.innerHTML = `
                <h3>Clima em ${data.name}</h3>
                <p>Temperatura: ${data.main.temp}°C</p>
                <p>Sensação Térmica: ${data.main.feels_like}°C</p>
                <p>Descrição: ${data.weather[0].description}</p>
                <p>Umidade: ${data.main.humidity}%</p>
            `;

        } else {
            console.error('Erro da API:', data.mensagem);
            alert(`Erro: ${data.mensagem}`);
        }

    } catch (error) {
        console.error('Erro de rede:', error);
        alert('Falha na comunicação com o servidor. Tente novamente mais tarde.');
    }
});