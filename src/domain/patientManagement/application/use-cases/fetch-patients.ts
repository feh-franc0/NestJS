import { Either, right } from '@/core/either'
import { PatientsRepository } from '../repositories/patient-repository'
import { Patient } from '../../enterprise/entities/patient'
import { Injectable } from '@nestjs/common'

interface FetchPatientsUseCaseRequest {
  page: number
}

type FetchPatientsUseCaseResponse = Either<
  null,
  {
    patients: Patient[]
  }
>

@Injectable()
export class FetchPatientsUseCase {
  constructor(private patientsRepository: PatientsRepository) {}

  async execute({
    page,
  }: FetchPatientsUseCaseRequest): Promise<FetchPatientsUseCaseResponse> {
    const patients = await this.patientsRepository.fetchPatients({ page })

    return right({
      patients,
    })
  }
}
