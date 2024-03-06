import { PatientAttachment } from '../../enterprise/entities/patient-attachment'

export abstract class PatientAttachmentsRepository {
  abstract findManyByPatientId(patientId: string): Promise<PatientAttachment[]>
  abstract deleteManyByPatientId(patientId: string): Promise<void>
}
