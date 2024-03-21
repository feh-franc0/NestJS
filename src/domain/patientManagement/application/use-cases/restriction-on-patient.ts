import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { PatientRestriction } from '../../enterprise/entities/patient-restriction'
import { PatientsRepository } from '../repositories/patient-repository'
import { PatientRestrictionsRepository } from '../repositories/patient-restrictions-repository'

interface IType {
  type: 'ALLERGY' | 'RESTRICTION'
}

interface RestrictionOnPatientUseCaseRequest {
  patientId: string
  name: string
  type: IType
}

type RestrictionOnPatientUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    patientRestriction: PatientRestriction
  }
>

@Injectable()
export class RestrictionOnPatientUseCase {
  constructor(
    private patientsRepository: PatientsRepository,
    private patientRestrictionsRepository: PatientRestrictionsRepository,
  ) {}

  async execute({
    patientId,
    name,
    type,
  }: RestrictionOnPatientUseCaseRequest): Promise<RestrictionOnPatientUseCaseResponse> {
    const patient = await this.patientsRepository.findById(patientId)

    if (!patient) {
      return left(new ResourceNotFoundError())
    }

    const patientRestriction = PatientRestriction.create({
      patientId: new UniqueEntityID(patientId),
      name,
      type: { type: 'ALLERGY' },
    })

    await this.patientRestrictionsRepository.create(patientRestriction)

    return right({
      patientRestriction,
    })
  }
}
