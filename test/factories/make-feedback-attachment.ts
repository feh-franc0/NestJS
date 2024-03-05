import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  FeedbackAttachment,
  FeedbackAttachmentProps,
} from '@/domain/forum/enterprise/entities/feedback-attachment'

export function makeFeedbackAttachment(
  override: Partial<FeedbackAttachmentProps> = {},
  id?: UniqueEntityID,
) {
  const feedbackAttachment = FeedbackAttachment.create(
    {
      feedbackId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return feedbackAttachment
}
