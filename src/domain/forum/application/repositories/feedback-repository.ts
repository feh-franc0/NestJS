import { PaginationParams } from '@/core/repositories/pagination-params'
import { Feedback } from '../../../forum/enterprise/entities/feedback'

export abstract class FeedbackRepository {
  abstract findById(id: string): Promise<Feedback | null>
  abstract findBySlug(slug: string): Promise<Feedback | null>
  abstract findManyRecent(params: PaginationParams): Promise<Feedback[]>
  abstract edit(feedback: Feedback): Promise<void>
  abstract create(feedback: Feedback): Promise<void>
  abstract delete(feedback: Feedback): Promise<void>
}
