import { DomainEvent } from '@/core/events/domain-event'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Feedback } from '../entities/feedback'

export class FeedbackBestAnswerChosenEvent implements DomainEvent {
  public ocurredAt: Date
  public feedback: Feedback
  public bestAnswerId: UniqueEntityID

  constructor(feedback: Feedback, bestAnswerId: UniqueEntityID) {
    this.feedback = feedback
    this.bestAnswerId = bestAnswerId
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.feedback.id
  }
}
