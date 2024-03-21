import { PaginationParams } from '@/core/repositories/pagination-params'
import { PatientMedication } from '../../enterprise/entities/patient-medication'

export abstract class PatientMedicationsRepository {
  abstract findById(id: string): Promise<PatientMedication | null>

  abstract findManyByPatientId(
    patientId: string,
    params: PaginationParams,
  ): Promise<PatientMedication[]>

  abstract create(patientMedication: PatientMedication): Promise<void>
  abstract delete(patientMedication: PatientMedication): Promise<void>
}
