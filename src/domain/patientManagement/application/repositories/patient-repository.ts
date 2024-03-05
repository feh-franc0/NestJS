import { PaginationParams } from '@/core/repositories/pagination-params'
import { Patient } from '../../enterprise/entities/patient'

export interface PatientRepository {
  findById(id: string): Promise<Patient | null>
  findByEmail(email: string): Promise<Patient | null>
  fetchPatients(params: PaginationParams): Promise<Patient[]>
  create(patient: Patient): Promise<void>
  edit(patient: Patient): Promise<void>
  delete(patient: Patient): Promise<void>
}
