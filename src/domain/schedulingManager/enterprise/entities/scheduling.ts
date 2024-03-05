import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface SchedulingProps {
  companyId: UniqueEntityID
  patientId: UniqueEntityID
  employeeId: UniqueEntityID
  address: string
}

export abstract class Scheduling<
  Props extends SchedulingProps,
> extends Entity<Props> {
  get companyId() {
    return this.props.companyId
  }

  get patientId() {
    return this.props.patientId
  }

  get employeeId() {
    return this.props.employeeId
  }

  get address() {
    return this.props.address
  }
}

/**
 * saude
 * * home care
 * * clinica odonto
 * * clinica estetica
 * * clinica veterinaria
 * * personal
 * * criancas(autismo)
 * * psicologo
 */

// TODO 1 - consulta: no dia 15 do mes que vem
// * startHours: 1:00
// * closingHours: 2:00
// * quantidade de horas e minutos que vai durar a consulta
// * timeStamp: dia-mes-ano-hora-minuto-seg

// TODO 2 - consulta: toda segunda e quinta(dia(s) da semana) -> cuidador de pessoas com transtorno e personal
// ? front [dom, seg,tec, quart, quint, sext, sab]
/**
 * {
 *    * startHours: 1:00
 *    * closingHours: 2:00
 *    * quantidade de horas e minutos que vai durar a consulta
 *    * [seg, quart, sext]
 * }
 */

// TODO 3 - consulta: tres dias sim 2 dias nao -> home care
/**
 * {
 *    * startTimeStamp: dia-mes-ano-hora-minuto // inicio do trabalho da pessoa
 *    * amountHoursScheduling: 48h // 2 dias sim
 *    * gapInHours: 72hs // 3 day nao
 * }
 */

// calendario [1-30] div [horario]
// valida:
// endereco
// hora
// timestamp

// * 1 ano de contrato
// * 2 dias sim 3 dias não
// * mes quando cada funcionario vai atender (dia e horario)

// ? D S T Q Q S S
// * o o x x x 0 0
// * x x x 0 0 x x

// 4 - consulta: do dia 24 até o dia 27

// ? CRUD
// ! CANCELAR ATENDIMENTO
// * REMARCAR ATENDIMENTO

// 2024/01 []

// 2024 {
//   jan [
//     {dia: 01, cosultas: [
//       {},
//       {}
//     ] }
//     2,
//     3,
//     4,
//     ...
//     30
//   ]

//   fev
//   marc
//   ...
//   dez
// }

// 3 dias, do dia 1 ao 3

// front: calendario que tem 31 dias

// {"dia": {"$gt": 20240320, "$lt": 20250231}}

// seg, quart, sext

// seg do dia 01/01/24 - 01/01/25
// createMany {
//   111
// }

// 1.000.000.000 => idempresa(1.0000.000) => apenas do mes (100.000x3)

// por mes [30]

/**
  agendamentoConsulta {
    idmed,
    idpac,
    addressID,
    idconsulta,
    startconsultaTimestamp, timestamp 1000000 inicial
    previsaoHora, (1hora) 1000000 + 1
    type: type1 | type2 | type3,
  }

  idconsulta
  =
  consulta {
    pac,
    med,
    horainciio,
    previsao da consulta
    idResultado
  }

  resultadosDaConsulta {
    docs, 
    raio-x, 
    resultado de exames, 
    medicamentos
  }

  consulta vai ter os dados do diagnostico[docs, raio-x, resultado de exames, medicamentos] => enviar pro patiente

  reenviar aos clientes do proximo dia o horario da consulta.
 */
