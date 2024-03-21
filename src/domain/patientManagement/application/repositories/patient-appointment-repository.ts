import { PaginationParams } from '@/core/repositories/pagination-params'
import { PatientAppointment } from '../../enterprise/entities/patient-appointments'

export abstract class PatientAppointmentsRepository {
  abstract findById(id: string): Promise<PatientAppointment | null>

  abstract findManyByPatientId(
    patientId: string,
    params: PaginationParams,
  ): Promise<PatientAppointment[]>

  abstract create(patientAppointment: PatientAppointment): Promise<void>
  abstract delete(patientAppointment: PatientAppointment): Promise<void>
}
