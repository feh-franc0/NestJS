import { PaginationParams } from '@/core/repositories/pagination-params'
import { UniqueDayScheduling } from '../../enterprise/entities/scheduling-unique-day'

export interface UniqueDaySchedulingRepository {
  findCheckUniqueDaySchedulingConflict(
    startUniqueDayScheduling: number,
    closingUniqueDayScheduling: number,
  ): Promise<UniqueDayScheduling | null>
  fetchUniqueDaySchedulings(
    params: PaginationParams,
  ): Promise<UniqueDayScheduling[]>
  create(uniquedayscheduling: UniqueDayScheduling): Promise<void>
  edit(uniquedayscheduling: UniqueDayScheduling): Promise<void>
  delete(uniquedayscheduling: UniqueDayScheduling): Promise<void>
}
