import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  PatientAttachment,
  PatientAttachmentProps,
} from '@/domain/patientManagement/enterprise/entities/patient-attachment'

export function makePatientAttachment(
  override: Partial<PatientAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const patientAttachment = PatientAttachment.create(
    {
      patientId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return patientAttachment
}
