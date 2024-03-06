import { FeedbackAttachment } from '../../enterprise/entities/feedback-attachment'

export interface FeedbackAttachmentsRepository {
  findManyByFeedbackId(feedbackId: string): Promise<FeedbackAttachment[]>
  deleteManyByFeedbackId(feedbackId: string): Promise<void>
}
