require('dotenv').config()
const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.get('/previsao/:cidade', async (req, res) => {
    try {
        const cidade = req.params.cidade;
        const API_key = process.env.API_key
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${API_key}&units=metric&lang=pt_br`
        const respostaDaApi = await axios.get(apiUrl);

        res.json(respostaDaApi.data)

    } catch (error) {

        console.error("Erro ao buscar dados do clima:", error.message)
        res.status(500).json({ mensagem: 'Erro ao consultar o clima. Verifique o nome da cidade ou a chave da API.' })
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
});