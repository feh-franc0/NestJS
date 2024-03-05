import { PatientAttachment } from '../../enterprise/entities/patient-attachment'

export interface PatientAttachmentsRepository {
  findManyByPatientId(patientId: string): Promise<PatientAttachment[]>
  deleteManyByPatientId(patientId: string): Promise<void>
}
