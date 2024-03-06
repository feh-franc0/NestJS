import { PaginationParams } from '@/core/repositories/pagination-params'
import { FeedbackComment } from '../../enterprise/entities/feedback-comment'

export interface FeedbackCommentsRepository {
  findById(id: string): Promise<FeedbackComment | null>
  findManyByFeedbackId(
    feedbackId: string,
    params: PaginationParams,
  ): Promise<FeedbackComment[]>
  create(feedbackComment: FeedbackComment): Promise<void>
  delete(feedbackComment: FeedbackComment): Promise<void>
}
