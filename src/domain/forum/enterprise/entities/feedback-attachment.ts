import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface FeedbackAttachmentProps {
  feedbackId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class FeedbackAttachment extends Entity<FeedbackAttachmentProps> {
  get feedbackId() {
    return this.props.feedbackId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: FeedbackAttachmentProps, id?: UniqueEntityID) {
    const attachment = new FeedbackAttachment(props, id)

    return attachment
  }
}
