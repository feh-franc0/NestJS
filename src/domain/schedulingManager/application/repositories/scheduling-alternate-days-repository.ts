import { PaginationParams } from '@/core/repositories/pagination-params'
import { AlternateScheduling } from '../../enterprise/entities/scheduling-alternate-days'

export interface AlternateSchedulingRepository {
  findCheckAlternateSchedulingConflict(
    startAlternateScheduling: number,
    closingAlternateScheduling: number,
  ): Promise<AlternateScheduling | null>
  fetchAlternateSchedulings(
    params: PaginationParams,
  ): Promise<AlternateScheduling[]>
  create(alternatescheduling: AlternateScheduling[]): Promise<void>
  edit(alternatescheduling: AlternateScheduling): Promise<void>
  delete(alternatescheduling: AlternateScheduling): Promise<void>
}
