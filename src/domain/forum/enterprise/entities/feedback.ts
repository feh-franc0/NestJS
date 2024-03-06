import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Slug } from './value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { FeedbackAttachmentList } from './feedback-attachment-list'
import { FeedbackBestAnswerChosenEvent } from '../events/feedback-best-answer-chosen'

export interface FeedbackProps {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID | null
  title: string
  content: string
  slug: Slug
  attachments: FeedbackAttachmentList
  createdAt: Date
  updatedAt?: Date | null
}

export class Feedback extends AggregateRoot<FeedbackProps> {
  get authorId() {
    return this.props.authorId
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: FeedbackAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined | null) {
    if (bestAnswerId && bestAnswerId !== this.props.bestAnswerId) {
      this.addDomainEvent(new FeedbackBestAnswerChosenEvent(this, bestAnswerId))
    }

    this.props.bestAnswerId = bestAnswerId

    this.touch()
  }

  static create(
    props: Optional<FeedbackProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const feedback = new Feedback(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new FeedbackAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return feedback
  }
}
