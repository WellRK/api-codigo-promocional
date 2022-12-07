let cql = require("./cql");
let db = require('./db.js');

exports.cadastrarBeneficiario = async function (beneficiario) {
  let result = await db.neo4j.executeCypherAsync(cql.query.CADASTRAR_BENEFICIARIO, false, { beneficiario });
  return result;
}

exports.validarBeneficiario = async function (beneficiario) {
  let result = await db.neo4j.executeCypherAsync(cql.query.VALIDAR_BENEFICIARIO, true, {beneficiario});
  return result;
}

exports.consultarCodigoPromocional = async function (codigoPromocional) {
  let result = await db.neo4j.executeCypherAsync(cql.query.CONSULTAR_CODIGO_PROMOCIONAL, true, {codigoPromocional});
  return result;
}



exports.validarBeneficiarioCPF = async function (beneficiario) {
  let result = await db.neo4j.executeCypherAsync(cql.query.VALIDAR_BENEFICIARIO_CPF, true, {beneficiario});
  return result;
}