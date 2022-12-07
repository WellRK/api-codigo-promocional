let business = require('./business.js');
let utils = require('./utils.js');
const axios = require('axios')

for (const obj in process.env) {
    console.log(`process.env[${obj}] = ${process.env[obj]}`)
}




exports.loadTestCadastrar = async function (req, res, next) {
    try {

        const threads = req.body.threads
        const calls = req.body.calls

        let testes = []

        for (let index = 0; index < calls; index++) {

            let ret = axios({
                method: 'POST',
                baseURL: '',
                url: '',
                headers: {
                    'Accept': 'application/json; charset=UTF-8',
                },
                data: {
                    "cpf": "1234",
                    "nome": "Teste",
                    "situacaoBeneficiario": "ativo",
                    "origemBeneficiario": "Teste",
                    "tipoBeneficiario": "Funcionário"
                }
            })

            testes.push(ret)

            if (testes.length > threads) {
                let thread = testes.splice(-threads)

                for (let indexThread = 0; indexThread < thread.length; indexThread++) {
                    const element = await thread[indexThread];
                    console.log(element.data)

                }
            }
        }

        for (let indexThread = 0; indexThread < testes.length; indexThread++) {
            const element = await testes[indexThread];
            console.log(element.data)

        }


        res.send(200)


    }
    catch (err) {
        res.send(401)
        return;
    }

}

exports.loadTestConsultar = async function (req, res, next) {
    try {

        const threads = req.body.threads
        const calls = req.body.calls

        let testes = []

        for (let index = 0; index < calls; index++) {

            let ret = axios({
                method: 'POST',
                baseURL: '',
                url: '',
                headers: {
                    'Accept': 'application/json; charset=UTF-8',
                },
                data: {
                    "cpf": "1234",
                    "origemConsulta": "Teste"
                }
            })

            testes.push(ret)

            if (testes.length > threads) {
                let thread = testes.splice(-threads)

                for (let indexThread = 0; indexThread < thread.length; indexThread++) {
                    const element = await thread[indexThread];
                    console.log(element.data)

                }
            }
        }

        for (let indexThread = 0; indexThread < testes.length; indexThread++) {
            const element = await testes[indexThread];
            console.log(element.data)

        }


        res.send(200)


    }
    catch (err) {
        res.send(401)
        return;
    }

}

exports.autorizar = async function (req, res, next) {
    try {

        var token = req.header('token');
        var refresh_token = req.header('refresh_token');
        if (token === undefined) {
            res.send(401, { error_code: 401, status: false, message: 'Acesso negado! (401)' })
            return next(false)
        } else {
            axios({
                method: 'GET',
                baseURL: process.env.SECURITY_API,
                url: process.env.SECURITY_API,
                headers: {
                    'Accept': 'application/json; charset=UTF-8',
                    'Authorization': 'Bearer ' + token,
                    'refresh_token': refresh_token
                }
            })
                .then(function () {
                    next()
                })
                .catch(e => {
                    res.send(401, { status: false, error_code: 401, message: 'Acesso negado!' + refresh_token })
                    return next(e);
                })
        }
    }
    catch (err) {
        res.send(401)
        return;
    }

}

exports.validarPayloadConsulta = async function (req, res, next) {
    try {
        let request = req.body;
        let resultadoValidacao = utils.validar.beneficiarioConsulta(request);
        if (resultadoValidacao.validacoes == 0) {
            next()
        }
        else {
            res.send(resultadoValidacao.status, resultadoValidacao)
        }
        return;
    }
    catch (err) {
        res.send(401)
        return;
    }

    next()
    return
}


exports.validarPayloadBeneficiario = async function (req, res, next) {
    try {
        let request = req.body;
        let resultadoValidacao = utils.validar.beneficiarioConsulta(request);
        if (resultadoValidacao.validacoes == 0) {
            next()
        }
        else {
            res.send(resultadoValidacao.status, resultadoValidacao)
        }
        return;
    }
    catch (err) {
        res.send(401)
        return;
    }

    next()
    return
}



exports.validarPayloadConsultaCodigoPromocional = async function (req, res, next) {
    try {
        let request = req.body;
        let resultadoValidacao = utils.validar.beneficiarioConsultaCodigoPromocional(request);
        if (resultadoValidacao.validacoes == 0) {
            next()
        }
        else {
            res.send(resultadoValidacao.status, resultadoValidacao)
        }
        return;
    }
    catch (err) {
        res.send(401)
        return;
    }

    next()
    return
}

exports.validarPayloadCadastro = async function (req, res, next) {
    try {
        let request = req.body;
        let resultadoValidacao = utils.validar.beneficiarioCadastro(request);
        if (resultadoValidacao.validacoes == 0) {
            next()
        }
        else {
            res.send(resultadoValidacao.status, resultadoValidacao)
        }
        return;
    }
    catch (err) {
        res.send(401)
        return;
    }

    next()
    return
}

exports.cadastrarBeneficiario = async function (req, res, next) {
    try {
        let request = req.body;
        var result;

        if (typeof request === 'string')
            request = utils.convert.stringToJSON(request);

        if (!request.token)
            request.token = ('000000' + Math.floor((Math.random() * 999999) + 1).toString()).substr(-6);

        result = await business.cadastrarBeneficiario(request)

        res.send(200, { status: 200, beneficiarioCriado: result, mensagem: 'Beneficiário criado com sucesso!' });
        return;
    }
    catch (err) {
        next(err);
        return;
    }

    next()
    return
}

exports.validarBeneficiarioCPF = async function (req, res, next) {
    try {
        let request = req.body;
        var result;

        if (typeof request === 'string')
            request = utils.convert.stringToJSON(request);

        result = await business.validarBeneficiarioCPF(request)

        if (result.situacaoBeneficiario == 'ativo')
            res.send(200, { status: 200, beneficiarioCriado: result, mensagem: 'Beneficiário criado com sucesso!' });
        else
            res.send(404, { status: 404, mensagem: 'Beneficiário não localizado!' });
        return;
    }
    catch (err) {
        console.log(err)
        res.send(500, { mensagem: 'Erro inexperado! Entrar com contato com o suporte!' });
        return;
    }

    next()
    return
}

exports.validarBeneficiario = async function (req, res, next) {
    try {
        let request = req.body;
        var result;

        if (typeof request === 'string')
            request = utils.convert.stringToJSON(request);

        result = await business.validarBeneficiario(request)

        if (result.situacaoBeneficiario == 'ativo')
            res.send(200, { status: 200, beneficiarioCriado: result, mensagem: 'Beneficiário criado com sucesso!' });
        else
            res.send(404, { status: 404, mensagem: 'Beneficiário não localizado!' });
        return;
    }
    catch (err) {
        console.log(err)
        res.send(500, { mensagem: 'Erro inexperado! Entrar com contato com o suporte!' });
        return;
    }

    next()
    return
}

exports.consultarCodigoPromocional = async function (req, res, next) {
    try {
        let request = req.body;
        var result;

        if (typeof request === 'string')
            request = utils.convert.stringToJSON(request);

        result = await business.consultarCodigoPromocional(request.codigoPromocional)

        if (result.situacaoBeneficiario == 'ativo')
            res.send(200, { status: 200, beneficiarioCriado: result, mensagem: 'Beneficiário criado com sucesso!' });
        else
            res.send(404, { status: 404, mensagem: 'Beneficiário não localizado!' });
        return;
    }
    catch (err) {
        console.log(err)
        res.send(500, { mensagem: 'Erro inexperado! Entrar com contato com o suporte!' });
        return;
    }

    next()
    return
}