import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  FeedbackComment,
  FeedbackCommentProps,
} from '@/domain/forum/enterprise/entities/feedback-comment'

export function makeFeedbackComment(
  override: Partial<FeedbackCommentProps> = {},
  id?: UniqueEntityID,
) {
  const feedbackComment = FeedbackComment.create(
    {
      authorId: new UniqueEntityID(),
      feedbackId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return feedbackComment
}
