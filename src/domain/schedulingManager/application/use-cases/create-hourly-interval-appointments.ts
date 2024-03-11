import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from './errors/already-exists-error'
import { InvalidTimestampOrderError } from './errors/invalid-timestamp-order-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Appointment } from '../../enterprise/entities/appointment'
import { AppointmentRepository } from '../repositories/appointment-repository'

interface CreateHourlyIntervalAppointmentsUseCaseRequest {
  companyId: string
  patientId: string
  employeeId: string
  address: string
  startContractTimeStamp: number
  endContractTimeStamp: number
  workDays: number
  restDays: number
  appointmentResultId: string
  notes?: string
}

type CreateHourlyIntervalAppointmentsUseCaseResponse = Either<
  AlreadyExistsError | InvalidTimestampOrderError,
  {
    appointments: Appointment[]
  }
>

export class CreateHourlyIntervalAppointmentsUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    companyId,
    patientId,
    employeeId,
    address,
    startContractTimeStamp,
    endContractTimeStamp,
    workDays,
    restDays,
    appointmentResultId,
    notes,
  }: CreateHourlyIntervalAppointmentsUseCaseRequest): Promise<CreateHourlyIntervalAppointmentsUseCaseResponse> {
    if (startContractTimeStamp > endContractTimeStamp) {
      return left(new InvalidTimestampOrderError())
    }

    // Verificar se já existe um contrato com os mesmos parâmetros
    const existingAppointment =
      await this.appointmentRepository.getAppointmentByParameters(
        companyId,
        patientId,
        employeeId,
        startContractTimeStamp,
      )
    if (existingAppointment) {
      return left(new AlreadyExistsError())
    }

    const generatedAppointments: Appointment[] = []

    const hourInMillis = 60 * 60 * 1000
    const dayInMillis = 24 * hourInMillis

    let currentTimestamp = startContractTimeStamp
    let currentWorkDay = 0

    // Adiciona o primeiro dia do contrato como um dia de trabalho
    const appointmentStart = currentTimestamp
    const appointmentEnd = currentTimestamp + dayInMillis // Define o final do compromisso como o final do dia
    const appointmentDuration = 24 * 60 // Duração de 24 horas em minutos

    const appointmentProps = {
      companyId: new UniqueEntityID(companyId),
      patientId: new UniqueEntityID(patientId),
      employeeId: new UniqueEntityID(employeeId),
      address,
      startAppointmentTimestamp: appointmentStart,
      endAppointmentTimestamp: appointmentEnd,
      durationInMinutes: appointmentDuration,
      appointmentResultId,
      type: 'HOURLY_INTERVAL' as const,
      notes,
    }

    const appointment = Appointment.create(appointmentProps)

    if (appointment !== null) {
      generatedAppointments.push(appointment)
    } else {
      // Tratar o caso de falha na criação do appointment
      return left(new Error('Failed to create appointment'))
    }

    currentWorkDay++

    while (currentTimestamp < endContractTimeStamp) {
      // Atualiza para o próximo dia
      currentTimestamp += dayInMillis

      // Verifica se o próximo dia é um dia de trabalho
      if (currentWorkDay < workDays) {
        const appointmentStart = currentTimestamp
        const appointmentEnd = currentTimestamp + dayInMillis // Define o final do compromisso como o final do dia
        const appointmentDuration = 24 * 60 // Duração de 24 horas em minutos

        const appointmentProps = {
          companyId: new UniqueEntityID(companyId),
          patientId: new UniqueEntityID(patientId),
          employeeId: new UniqueEntityID(employeeId),
          address,
          startAppointmentTimestamp: appointmentStart,
          endAppointmentTimestamp: appointmentEnd,
          durationInMinutes: appointmentDuration,
          appointmentResultId,
          type: 'HOURLY_INTERVAL' as const,
          notes,
        }

        const appointment = Appointment.create(appointmentProps)

        if (appointment !== null) {
          generatedAppointments.push(appointment)
        } else {
          // Tratar o caso de falha na criação do appointment
          return left(new Error('Failed to create appointment'))
        }

        currentWorkDay++
      }

      // Verifica se é um dia de folga
      if (currentWorkDay === workDays) {
        // Adiciona os dias de folga
        currentTimestamp += restDays * dayInMillis
        currentWorkDay = 0 // Reinicia o contador de dias de trabalho
      }
    }

    // Retorna os appointments gerados apenas para os dias de trabalho
    return right({
      appointments: generatedAppointments,
    })
  }
}
