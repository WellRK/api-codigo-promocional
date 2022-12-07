exports.convert = {
    stringToJSON: function (stringText) {
        return JSON.parse(stringText);
    }
}

exports.validar = {
    validarCPF: function (strCPF) {
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    },

    beneficiarioCadastro: function (objExemplo) {
        let validacoes = []
        let documentacao = [{
            propriedade: "cpf",
            tipo: "string",
            validacoes: ['Validação padrão mod11', 'Obrigatório ter 11 caracteres', 'Somente números']
        },

        {
            propriedade: "nome",
            tipo: "string",
            validacoes: ['Validação padrão mod11', 'Obrigatório ter no mínimo 3 caracteres', 'Somente números']
        },

        {
            propriedade: "tipoBeneficiario",
            tipo: "string",
            validacoes: ["Valores permitidos 'Corretor','Funcionário' ou 'Terceiro'"]
        },

        {
            propriedade: "origemBeneficiario",
            tipo: "string",
            validacoes: ["Valores permitidos 'Teste', 'Teste', 'Teste' ou 'Teste'"]
        }
        ]

        if (typeof objExemplo === 'string') {
            objExemplo = convert.stringToJSON(objExemplo);
        }

        if (!objExemplo.cpf) {
            validacoes.push({ propriedade: 'cpf', mensagem: 'Campo obrigatório não informado!' })
            objExemplo.cpf = null
        }

        if (objExemplo.cpf) {
            objExemplo.cpf = objExemplo.cpf.replace(/[^0-9]/g, '');
            ("00000000000" + objExemplo.cpf).slice(-11);
            if (!this.validarCPF(objExemplo.cpf)) {
                validacoes.push({ propriedade: 'cpf', mensagem: 'O CPF informado é inválido!' })
            }
        }

        if (!objExemplo.nome) {
            validacoes.push({ propriedade: 'nome', mensagem: 'Campo obrigatório não informado!' })
            objExemplo.nome = null
        }

        if (!objExemplo.nome || objExemplo.nome.length < 3) {
            validacoes.push({ propriedade: 'nome', mensagem: 'Campo nome deve ter no mímino 3 letras!' })
        }

        if (!objExemplo.tipoBeneficiario) {
            validacoes.push({ propriedade: 'tipoBeneficiario', mensagem: 'Campo obrigatório não informado!' })
            objExemplo.tipoBeneficiario = null
        }

        if (!['Beneficiário', 'Corretor', 'Funcionário', 'Terceiro'].includes(objExemplo.tipoBeneficiario)) {
            validacoes.push({ propriedade: 'tipoBeneficiario', mensagem: "Campo 'tipoBeneficiario' está inválido!" })
            objExemplo.tipoBeneficiario = null
        }

        if (!objExemplo.origemBeneficiario) {
            validacoes.push({ propriedade: 'origemBeneficiario', mensagem: 'Campo obrigatório não informado!' })
            objExemplo.origemBeneficiario = null
        }

        if (!['Teste', 'Teste', 'Teste', 'Teste'].includes(objExemplo.origemBeneficiario)) {
            validacoes.push({ propriedade: 'origemBeneficiario', mensagem: "Campo 'origemBeneficiario' está inválido! " })
        }

        let status = 200
        if (validacoes.length > 0) {
            status = 400
        }

        return { status, objExemplo, validacoes, documentacao }

    },

    beneficiarioConsulta: function (objExemplo) {
        let validacoes = []
        let documentacao = [{
            propriedade: "cpf",
            tipo: "string",
            validacoes: ['Validação padrão mod11', 'Obrigatório ter 11 caracteres', 'Somente números']
        },
        {
            propriedade: "origemConsulta",
            tipo: "string",
            validacoes: ["Valores permitidos 'Teste', 'Teste', 'Teste' ou 'Teste'"]
        },
        {
            propriedade: "token",
            tipo: "string",
            validacoes: ["Token disponibilizado para o cliente"]
        }]

        if (typeof objExemplo === 'string') {
            objExemplo = convert.stringToJSON(objExemplo);
        }

        if (!objExemplo.cpf) {
            validacoes.push({ propriedade: 'cpf', mensagem: 'Campo obrigatório não informado!' })
            objExemplo.cpf = null
        }

        if (objExemplo.cpf) {
            objExemplo.cpf = objExemplo.cpf.replace(/[^0-9]/g, '');
            ("00000000000" + objExemplo.cpf).slice(-11);
            if (!this.validarCPF(objExemplo.cpf)) {
                validacoes.push({ propriedade: 'cpf', mensagem: 'O CPF informado é inválido!' })
            }
        }

        if (!objExemplo.origemConsulta) {
            validacoes.push({ propriedade: 'origemConsulta', mensagem: 'Campo obrigatório não informado!' })
            objExemplo.origemConsulta = null
        }

        if (!['Teste', 'Teste', 'Teste', 'Teste'].includes(objExemplo.origemConsulta)) {
            validacoes.push({ propriedade: 'origemConsulta', mensagem: "Campo 'origemConsulta' está inválido!" })
        }

        if (!objExemplo.token) {
            validacoes.push({ propriedade: 'token', mensagem: 'Campo obrigatório não informado!' })
            objExemplo.token = null
        }

        let status = 200
        if (validacoes.length > 0) {
            status = 400
        }

        return { status, objExemplo, validacoes, documentacao }

    },

    beneficiarioConsultaCodigoPromocional: function (objExemplo) {
        let validacoes = []
        let documentacao = [{
            propriedade: "codigoPromocional",
            tipo: "string",
            validacoes: ['Token disponibilizado para o cliente', 'o código promocional possui o formato -999999-99999'], 
        }]

        if (typeof objExemplo === 'string') {
            objExemplo = convert.stringToJSON(objExemplo);
        }

        if (!objExemplo.codigoPromocional) {
            validacoes.push({ propriedade: 'codigoPromocional', mensagem: 'Campo obrigatório não informado!' })
            objExemplo.codigoPromocional = null
        }

        

        let status = 200
        if (validacoes.length > 0) {
            status = 400
        }

        return { status, objExemplo, validacoes, documentacao }

    },

    beneficiarioConsulta: function (objExemplo) {
        let validacoes = []
        let documentacao = [{
            propriedade: "cpf",
            tipo: "string",
            validacoes: ['Validação padrão mod11', 'Obrigatório ter 11 caracteres', 'Somente números']
        },
        {
            propriedade: "origemConsulta",
            tipo: "string",
            validacoes: ["Valores permitidos 'Teste', 'Teste', 'Teste', 'Teste' ou 'Teste'"]
        }]

        if (typeof objExemplo === 'string') {
            objExemplo = convert.stringToJSON(objExemplo);
        }

        if (!objExemplo.cpf) {
            validacoes.push({ propriedade: 'cpf', mensagem: 'Campo obrigatório não informado!' })
            objExemplo.cpf = null
        }

        if (objExemplo.cpf) {
            objExemplo.cpf = objExemplo.cpf.replace(/[^0-9]/g, '');
            ("00000000000" + objExemplo.cpf).slice(-11);
            if (!this.validarCPF(objExemplo.cpf)) {
                validacoes.push({ propriedade: 'cpf', mensagem: 'O CPF informado é inválido!' })
            }
        }

        if (!objExemplo.origemConsulta) {
            validacoes.push({ propriedade: 'origemConsulta', mensagem: 'Campo obrigatório não informado!' })
            objExemplo.origemConsulta = null
        }

        if (!['Teste','Teste', 'Teste', 'Teste', 'Teste'].includes(objExemplo.origemConsulta)) {
            validacoes.push({ propriedade: 'origemConsulta', mensagem: "Campo 'origemConsulta' está inválido!" })
        }


        let status = 200
        if (validacoes.length > 0) {
            status = 400
        }

        return { status, objExemplo, validacoes, documentacao }

    },

}



