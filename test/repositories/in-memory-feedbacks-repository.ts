import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { FeedbackAttachmentsRepository } from '@/domain/forum/application/repositories/feedback-attachments-repository'
import { FeedbackRepository } from '@/domain/forum/application/repositories/feedback-repository'
import { Feedback } from '@/domain/forum/enterprise/entities/feedback'

export class InMemoryFeedbacksRepository implements FeedbackRepository {
  public items: Feedback[] = []

  constructor(
    private feedbackAttachmentsRepository: FeedbackAttachmentsRepository,
  ) {}

  async findById(id: string) {
    const feedback = this.items.find((item) => item.id.toString() === id)

    if (!feedback) {
      return null
    }

    return feedback
  }

  async findBySlug(slug: string) {
    const feedback = this.items.find((item) => item.slug.value === slug)

    if (!feedback) {
      return null
    }

    return feedback
  }

  async findManyRecent({ page }: PaginationParams) {
    const feedbacks = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return feedbacks
  }

  async create(feedback: Feedback) {
    this.items.push(feedback)

    DomainEvents.dispatchEventsForAggregate(feedback.id)
  }

  async edit(feedback: Feedback) {
    const itemIndex = this.items.findIndex((item) => item.id === feedback.id)

    this.items[itemIndex] = feedback

    DomainEvents.dispatchEventsForAggregate(feedback.id)
  }

  async delete(feedback: Feedback) {
    const itemIndex = this.items.findIndex((item) => item.id === feedback.id)

    this.items.splice(itemIndex, 1)

    this.feedbackAttachmentsRepository.deleteManyByFeedbackId(
      feedback.id.toString(),
    )
  }
}
