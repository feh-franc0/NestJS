import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { PatientsRepository } from '../repositories/patient-repository'
import { PatientAppointment } from '../../enterprise/entities/patient-appointments'
import { PatientAppointmentsRepository } from '../repositories/patient-appointment-repository'

interface AppointmentOnPatientUseCaseRequest {
  patientId: string
  companyId: string
  consultationFee: string
  employeeId: string
  finalConsultDate: number
  initialConsultDate: number
  residenceAddress: string
}

type AppointmentOnPatientUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    patientAppointment: PatientAppointment
  }
>

@Injectable()
export class AppointmentOnPatientUseCase {
  constructor(
    private patientsRepository: PatientsRepository,
    private patientAppointmentsRepository: PatientAppointmentsRepository,
  ) {}

  async execute({
    patientId,
    companyId,
    consultationFee,
    employeeId,
    finalConsultDate,
    initialConsultDate,
    residenceAddress,
  }: AppointmentOnPatientUseCaseRequest): Promise<AppointmentOnPatientUseCaseResponse> {
    const patient = await this.patientsRepository.findById(patientId)

    if (!patient) {
      return left(new ResourceNotFoundError())
    }

    const patientAppointment = PatientAppointment.create({
      patientId: new UniqueEntityID(patientId),
      companyId: new UniqueEntityID(companyId),
      consultationFee,
      employeeId: new UniqueEntityID(employeeId),
      finalConsultDate,
      initialConsultDate,
      residenceAddress,
    })

    await this.patientAppointmentsRepository.create(patientAppointment)

    return right({
      patientAppointment,
    })
  }
}
