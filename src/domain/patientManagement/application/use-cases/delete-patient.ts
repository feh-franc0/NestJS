import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PatientsRepository } from '../repositories/patient-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface DeletePatientUseCaseRequest {
  patientId: string
  isCompany?: boolean
}

type DeletePatientUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {}
>

@Injectable()
export class DeletePatientUseCase {
  constructor(private patientsRepository: PatientsRepository) {}

  async execute({
    patientId,
    isCompany,
  }: DeletePatientUseCaseRequest): Promise<DeletePatientUseCaseResponse> {
    const patient = await this.patientsRepository.findById(patientId)

    if (!patient) {
      return left(new ResourceNotFoundError())
    }

    if (!isCompany) {
      return left(new NotAllowedError())
    }

    await this.patientsRepository.delete(patient)

    return right({})
  }
}
