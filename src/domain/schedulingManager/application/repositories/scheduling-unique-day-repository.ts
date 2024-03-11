import { PaginationParams } from '@/core/repositories/pagination-params'
import { UniqueDayScheduling } from '../../enterprise/entities/scheduling-unique-day'

export abstract class UniqueDaySchedulingRepository {
  abstract findCheckUniqueDaySchedulingConflict(
    startUniqueDayScheduling: number,
    closingUniqueDayScheduling: number,
  ): Promise<UniqueDayScheduling | null>

  abstract fetchUniqueDaySchedulings(
    params: PaginationParams,
  ): Promise<UniqueDayScheduling[]>

  abstract create(uniquedayscheduling: UniqueDayScheduling): Promise<void>
  abstract edit(uniquedayscheduling: UniqueDayScheduling): Promise<void>
  abstract delete(uniquedayscheduling: UniqueDayScheduling): Promise<void>
}
