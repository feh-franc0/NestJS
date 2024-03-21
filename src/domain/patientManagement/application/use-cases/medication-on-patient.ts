import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { PatientMedication } from '../../enterprise/entities/patient-medication'
import { PatientsRepository } from '../repositories/patient-repository'
import { PatientMedicationsRepository } from '../repositories/patient-medications-repository'

interface IType {
  type: 'DROP' | 'PILL'
}

interface MedicationOnPatientUseCaseRequest {
  patientId: string
  name: string
  type: IType
  dose: string
  timing: string
}

type MedicationOnPatientUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    patientMedication: PatientMedication
  }
>

@Injectable()
export class MedicationOnPatientUseCase {
  constructor(
    private patientsRepository: PatientsRepository,
    private patientMedicationsRepository: PatientMedicationsRepository,
  ) {}

  async execute({
    patientId,
    name,
    type,
    dose,
    timing,
  }: MedicationOnPatientUseCaseRequest): Promise<MedicationOnPatientUseCaseResponse> {
    const patient = await this.patientsRepository.findById(patientId)

    if (!patient) {
      return left(new ResourceNotFoundError())
    }

    const patientMedication = PatientMedication.create({
      patientId: new UniqueEntityID(patientId),
      name,
      type,
      dose,
      timing,
    })

    await this.patientMedicationsRepository.create(patientMedication)

    return right({
      patientMedication,
    })
  }
}
