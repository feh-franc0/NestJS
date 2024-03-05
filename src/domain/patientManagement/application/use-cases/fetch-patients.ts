import { Either, right } from '@/core/either'
import { PatientRepository } from '../repositories/patient-repository'
import { Patient } from '../../enterprise/entities/patient'

interface CreatePatientUseCaseRequest {
  page: number
}

type CreatePatientUseCaseResponse = Either<
  null,
  {
    patients: Patient[]
  }
>

export class CreatePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute({
    page,
  }: CreatePatientUseCaseRequest): Promise<CreatePatientUseCaseResponse> {
    const patients = await this.patientRepository.fetchPatients({ page })

    return right({
      patients,
    })
  }
}
