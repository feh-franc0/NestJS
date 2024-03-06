import { WatchedList } from '@/core/entities/watched-list'
import { FeedbackAttachment } from './feedback-attachment'

export class FeedbackAttachmentList extends WatchedList<FeedbackAttachment> {
  compareItems(a: FeedbackAttachment, b: FeedbackAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
