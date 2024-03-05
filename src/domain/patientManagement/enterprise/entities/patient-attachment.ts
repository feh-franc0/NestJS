import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface PatientAttachmentProps {
  patientId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class PatientAttachment extends Entity<PatientAttachmentProps> {
  get patientId() {
    return this.props.patientId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: PatientAttachmentProps, id?: UniqueEntityID) {
    const attachment = new PatientAttachment(props, id)

    return attachment
  }
}
