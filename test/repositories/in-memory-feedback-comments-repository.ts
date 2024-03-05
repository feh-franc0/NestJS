import { PaginationParams } from '@/core/repositories/pagination-params'
import { FeedbackCommentsRepository } from '@/domain/forum/application/repositories/feedback-comments-repository'
import { FeedbackComment } from '@/domain/forum/enterprise/entities/feedback-comment'

export class InMemoryFeedbackCommentsRepository
  implements FeedbackCommentsRepository
{
  public items: FeedbackComment[] = []

  async findById(id: string) {
    const feedbackComment = this.items.find((item) => item.id.toString() === id)

    if (!feedbackComment) {
      return null
    }

    return feedbackComment
  }

  async findManyByFeedbackId(feedbackId: string, { page }: PaginationParams) {
    const feedbackComment = this.items
      .filter((item) => item.feedbackId.toString() === feedbackId)
      .slice((page - 1) * 20, page * 20)

    return feedbackComment
  }

  async create(feedbackComment: FeedbackComment) {
    this.items.push(feedbackComment)
  }

  async delete(feedbackComment: FeedbackComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === feedbackComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
