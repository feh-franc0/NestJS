import { WatchedList } from '@/core/entities/watched-list'
import { PatientAttachment } from './patient-attachment'

export class PatientAttachmentList extends WatchedList<PatientAttachment> {
  compareItems(a: PatientAttachment, b: PatientAttachment): boolean {
    return a.attachmentId === b.attachmentId
  }
}
