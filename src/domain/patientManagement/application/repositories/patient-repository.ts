import { PaginationParams } from '@/core/repositories/pagination-params'
import { Patient } from '../../enterprise/entities/patient'

export abstract class PatientsRepository {
  abstract findById(id: string): Promise<Patient | null>
  abstract findByEmail(email: string): Promise<Patient | null>
  abstract fetchPatients(params: PaginationParams): Promise<Patient[]>
  abstract create(patient: Patient): Promise<void>
  abstract edit(patient: Patient): Promise<void>
  abstract delete(patient: Patient): Promise<void>
}
