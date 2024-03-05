import { FeedbackAttachmentsRepository } from '@/domain/forum/application/repositories/feedback-attachments-repository'
import { FeedbackAttachment } from '@/domain/forum/enterprise/entities/feedback-attachment'

export class InMemoryFeedbackAttachmentsRepository
  implements FeedbackAttachmentsRepository
{
  public items: FeedbackAttachment[] = []

  async findManyByFeedbackId(feedbackId: string) {
    const feedbackAttachment = this.items.filter(
      (item) => item.feedbackId.toString() === feedbackId,
    )

    return feedbackAttachment
  }

  async deleteManyByFeedbackId(feedbackId: string) {
    const feedbackAttachment = this.items.filter(
      (item) => item.feedbackId.toString() !== feedbackId,
    )

    this.items = feedbackAttachment
  }
}
