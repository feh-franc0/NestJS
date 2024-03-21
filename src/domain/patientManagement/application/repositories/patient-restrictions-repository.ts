import { PaginationParams } from '@/core/repositories/pagination-params'
import { PatientRestriction } from '../../enterprise/entities/patient-restriction'

export abstract class PatientRestrictionsRepository {
  abstract findById(id: string): Promise<PatientRestriction | null>

  abstract findManyByPatientId(
    patientId: string,
    params: PaginationParams,
  ): Promise<PatientRestriction[]>

  abstract create(patientRestriction: PatientRestriction): Promise<void>
  abstract delete(patientRestriction: PatientRestriction): Promise<void>
}
