import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PatientRepository } from '../repositories/patient-repository'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeletePatientUseCaseRequest {
  patientId: string
  isCompany?: boolean
}

type DeletePatientUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>

export class DeletePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute({
    patientId,
    isCompany,
  }: DeletePatientUseCaseRequest): Promise<DeletePatientUseCaseResponse> {
    const patient = await this.patientRepository.findById(patientId)

    if (!patient) {
      return left(new ResourceNotFoundError())
    }

    if (!isCompany) {
      return left(new NotAllowedError())
    }

    await this.patientRepository.delete(patient)

    return right({})
  }
}
