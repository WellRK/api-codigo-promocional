exports.query = {
  CADASTRAR_BENEFICIARIO: `

    merge(bnfStage:Beneficiario{cpf: $beneficiario.cpf})
    on create
    set 
      bnfStage.dataCriacao = timestamp(),
      bnfStage.token =  $beneficiario.token
  
    with bnfStage
    set 
        bnfStage.nome = $beneficiario.nome,
        bnfStage.tipoBeneficiario = $beneficiario.tipoBeneficiario,
        bnfStage.origemBeneficiario = $beneficiario.origemBeneficiario,
        bnfStage.situacaoBeneficiario = 'ativo',
        bnfStage.situacaoBeneficiario += $beneficiario

      return bnfStage{.*} as dados
  `
  , VALIDAR_BENEFICIARIO: `

    match (beneficiario:Beneficiario{cpf: $beneficiario.cpf, token: $beneficiario.token})
    return beneficiario{.*} as dados
  `,

  CONSULTAR_CODIGO_PROMOCIONAL: `

  MATCH (promocao:Promocao{codigoPromocional:$codigoPromocional})-[:CODIGO]->(bnfStage:Beneficiario)
  return bnfStage{.situacaoBeneficiario, .origemBeneficiario, .tipo } as dados
  
  `,

  VALIDAR_BENEFICIARIO_CPF: `
  MATCH (promocao:Promocao)-[:CODIGO]->(bnfStage:Beneficiario{cpf: $beneficiario.cpf})
  return bnfStage{.situacaoBeneficiario, .origemBeneficiario, .tipo, .token } as dados
  `


}


