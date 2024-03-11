import { PaginationParams } from '@/core/repositories/pagination-params'
import { DaysOfWeekScheduling } from '../../enterprise/entities/scheduling-days-of-week'

export abstract class DaysOfWeekSchedulingRepository {
  abstract findCheckDaysOfWeekSchedulingConflict(
    startDaysOfWeekScheduling: number,
    closingDaysOfWeekScheduling: number,
  ): Promise<DaysOfWeekScheduling | null>

  abstract fetchDaysOfWeekSchedulings(
    params: PaginationParams,
  ): Promise<DaysOfWeekScheduling[]>

  abstract create(daysofweekscheduling: DaysOfWeekScheduling[]): Promise<void>
  abstract edit(daysofweekscheduling: DaysOfWeekScheduling): Promise<void>
  abstract delete(daysofweekscheduling: DaysOfWeekScheduling): Promise<void>
}
