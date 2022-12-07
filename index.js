if (process.env.NODE_ENV_STAGE !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const controller = require('./scripts/controller.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

try {
    const port = process.env.PORT || 9303;
    app.listen(port);
    console.log(
        "Módulo iniciado na porta %s",
        port
    );
}
catch {
    console.log("Erro ao iniciar a api de importação de arquivo");
}

app.get('/', (req, res, next) => { res.status(200), res.json({ message: "OK" }) });

app.post('/api-quali-stage/consultar-cpf',
    controller.autorizar,
    controller.validarPayloadBeneficiario,
    controller.validarBeneficiarioCPF);

app.post('/api-quali-stage/desativar-codigo-cpf',
    controller.autorizar,
    controller.validarPayloadBeneficiario,
    controller.validarBeneficiarioCPF);


app.post('/api-quali-stage/ativar-codigo-cpf',
    controller.autorizar,
    controller.validarPayloadBeneficiario,
    controller.validarBeneficiarioCPF);


app.post('/api-quali-stage/consultar',
    controller.validarPayloadConsulta,
    controller.validarBeneficiario);

app.post('/api-quali-stage/validar-codigo-promocional',
    controller.validarPayloadConsultaCodigoPromocional,
    controller.consultarCodigoPromocional);


