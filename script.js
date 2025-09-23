const buscaCidade = document.getElementById('cidade-form')

function formatarData(dataString) {

    const data = new Date(dataString);
    const opcoes = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    return new Intl.DateTimeFormat('pt-BR', opcoes).format(data);
}

buscaCidade.addEventListener('submit', async (event) => {
    event.preventDefault();

    const cidadeProcurada = document.getElementById('cidade-procurada').value
    function exibirPrevisaoNaTela(data) {
        const divPrevisao = document.getElementById('previsao')
        const nomeDaCidade = data.city.name
        const htmlDasPrevisoes = data.list.slice(0, 8).map(previsao => {
            return `
            <div class="previsao-item" style="border: 1px solid #6E85B7; margin-bottom: 10px; padding: 10px; border-radius:5px">              
                <p><strong>Data e Hora:</strong> ${formatarData(previsao.dt_txt)}</p>            
                <p><strong>Temperatura:</strong> ${previsao.main.temp}°C</p>
                <p><strong>Umidade:</strong> ${previsao.main.humidity}%</p>
                <p><strong>Descrição:</strong> ${previsao.weather[0].description}</p>
            </div>
        `;
        }).join('')
        divPrevisao.innerHTML = `
        <h3>Previsão para ${nomeDaCidade} nas próximas 24h</h3>
        ${htmlDasPrevisoes}
    `;
    }
    if (!cidadeProcurada) {
        alert('Por favor, digite o nome de uma cidade.')
        return
    }
    try {
        const response = await fetch(`http://localhost:3000/previsao/${cidadeProcurada}`)
        const data = await response.json()

        if (response.ok) {
            exibirPrevisaoNaTela(data)
        } else {
            console.error('Erro da API:', data.mensagem)
            alert(`Erro: ${data.mensagem}`)
        }

    } catch (error) {
        console.error('Erro de rede:', error)
        alert('Falha na comunicação com o servidor. Tente novamente mais tarde.')
    }
})