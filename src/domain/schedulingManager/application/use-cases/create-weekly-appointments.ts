import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from './errors/already-exists-error'
import { InvalidTimestampOrderError } from './errors/invalid-timestamp-order-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Appointment,
  AppointmentProps,
} from '../../enterprise/entities/appointment'
import { AppointmentRepository } from '../repositories/appointment-repository'
import { InvalidDurationError } from './errors/invalid-duration-error'

type WeekDay =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'

interface CreateWeeklyAppointmentsUseCaseRequest {
  companyId: string
  patientId: string
  employeeId: string
  address: string
  scheduledDaysWeek: WeekDay[]
  startContractTimeStamp: number
  endContractTimeStamp: number // Adicionado o endContractTimeStamp
  durationInMinutes: number
  appointmentResultId: string
  notes?: string
}

type CreateWeeklyAppointmentsUseCaseResponse = Either<
  AlreadyExistsError | InvalidTimestampOrderError,
  {
    appointments: Appointment[]
  }
>

export class CreateWeeklyAppointmentsUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    companyId,
    patientId,
    employeeId,
    address,
    scheduledDaysWeek,
    startContractTimeStamp,
    endContractTimeStamp, // Adicionado o endContractTimeStamp
    durationInMinutes,
    appointmentResultId,
    notes,
  }: CreateWeeklyAppointmentsUseCaseRequest): Promise<CreateWeeklyAppointmentsUseCaseResponse> {
    if (durationInMinutes < 20) {
      return left(new InvalidDurationError(20))
    }

    const generatedAppointments: Appointment[] = []

    const weekInMillis = 7 * 24 * 60 * 60 * 1000 // Uma semana em milissegundos
    const numberOfWeeks = Math.floor(
      (endContractTimeStamp - startContractTimeStamp) / weekInMillis,
    )

    for (let week = 0; week <= numberOfWeeks; week++) {
      const currentWeekStart = startContractTimeStamp + week * weekInMillis

      for (const scheduledDay of scheduledDaysWeek) {
        const dayIndex = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ].indexOf(scheduledDay)
        if (dayIndex !== -1) {
          const scheduledStart =
            currentWeekStart + dayIndex * 24 * 60 * 60 * 1000 // Início do dia especificado na semana
          const scheduledEnd = scheduledStart + durationInMinutes * 60 * 1000 // Fim do dia especificado na semana

          // Verificar se já existe um agendamento para o mesmo paciente ou funcionário no mesmo horário
          const existingAppointment = await this.appointmentRepository
            .getAppointmentsByFilter(
              new Date(scheduledStart),
              new Date(scheduledEnd),
              { page: 1 }, // Pagination parameters
            )
            .then((appointments) =>
              appointments.find(
                (appointment) =>
                  appointment.patientId.toString() === patientId ||
                  appointment.employeeId.toString() === employeeId,
              ),
            )

          if (existingAppointment) {
            return left(new AlreadyExistsError())
          }

          const props: AppointmentProps = {
            companyId: new UniqueEntityID(companyId),
            patientId: new UniqueEntityID(patientId),
            employeeId: new UniqueEntityID(employeeId),
            address,
            startAppointmentTimestamp: scheduledStart,
            durationInMinutes,
            appointmentResultId,
            type: 'WEEKLY',
            notes,
          }

          const appointment = Appointment.create(props)
          generatedAppointments.push(appointment)
        }
      }
    }

    // Salvar os appointments
    await this.appointmentRepository.createMultipleAppointments(
      generatedAppointments,
    )

    return right({
      appointments: generatedAppointments,
    })
  }
}
