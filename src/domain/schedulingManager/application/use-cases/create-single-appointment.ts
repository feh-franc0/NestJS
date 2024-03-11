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

interface CreateSingleAppointmentUseCaseRequest {
  companyId: string
  patientId: string
  employeeId: string
  address: string
  startAppointmentTimestamp: number
  durationInMinutes: number
  appointmentResultId: string
  notes?: string
}

type CreateSingleAppointmentUseCaseResponse = Either<
  AlreadyExistsError | InvalidTimestampOrderError,
  {
    appointments: Appointment[]
  }
>

export class CreateSingleAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    companyId,
    patientId,
    employeeId,
    address,
    startAppointmentTimestamp,
    durationInMinutes,
    appointmentResultId,
    notes,
  }: CreateSingleAppointmentUseCaseRequest): Promise<CreateSingleAppointmentUseCaseResponse> {
    if (durationInMinutes < 20) {
      return left(new InvalidDurationError(20))
    }

    const existingAppointment = await this.appointmentRepository
      .getAppointmentsByFilter(
        new Date(startAppointmentTimestamp),
        new Date(startAppointmentTimestamp + durationInMinutes * 60000),
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

    // Cria as propriedades do appointment
    const props: AppointmentProps = {
      companyId: new UniqueEntityID(companyId),
      patientId: new UniqueEntityID(patientId),
      employeeId: new UniqueEntityID(employeeId),
      address,
      startAppointmentTimestamp,
      durationInMinutes,
      appointmentResultId,
      type: 'SINGLE',
      notes,
    }

    // Cria o appointment
    const appointment = Appointment.create(props)

    // Verifica se o appointment já existe
    const appointmentExists =
      await this.appointmentRepository.getAppointmentById(
        appointment.id.toString(),
      )
    if (appointmentExists) {
      // Se já existir, retorna um erro
      return left(new AlreadyExistsError())
    }

    // Salva o appointment no repositório
    await this.appointmentRepository.createOneAppointment(appointment)

    // Retorna o appointment criado
    return right({
      appointments: [appointment],
    })
  }
}
