import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface FeedbackCommentProps extends CommentProps {
  feedbackId: UniqueEntityID
}

export class FeedbackComment extends Comment<FeedbackCommentProps> {
  get feedbackId() {
    return this.props.feedbackId
  }

  static create(
    props: Optional<FeedbackCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const feedbackComment = new FeedbackComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return feedbackComment
  }
}
