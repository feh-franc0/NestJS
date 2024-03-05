import { PaginationParams } from '@/core/repositories/pagination-params'
import { DaysOfWeekScheduling } from '../../enterprise/entities/scheduling-days-of-week'

export interface DaysOfWeekSchedulingRepository {
  findCheckDaysOfWeekSchedulingConflict(
    startDaysOfWeekScheduling: number,
    closingDaysOfWeekScheduling: number,
  ): Promise<DaysOfWeekScheduling | null>
  fetchDaysOfWeekSchedulings(
    params: PaginationParams,
  ): Promise<DaysOfWeekScheduling[]>
  create(daysofweekscheduling: DaysOfWeekScheduling[]): Promise<void>
  edit(daysofweekscheduling: DaysOfWeekScheduling): Promise<void>
  delete(daysofweekscheduling: DaysOfWeekScheduling): Promise<void>
}
