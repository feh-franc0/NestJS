import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Feedback,
  FeedbackProps,
} from '@/domain/forum/enterprise/entities/feedback'

export function makeFeedback(
  override: Partial<FeedbackProps> = {},
  id?: UniqueEntityID,
) {
  const feedback = Feedback.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return feedback
}
