import { PaginationParams } from '@/core/repositories/pagination-params'
import { AlternateScheduling } from '../../enterprise/entities/scheduling-alternate-days'

export abstract class AlternateSchedulingRepository {
  abstract findCheckAlternateSchedulingConflict(
    startAlternateScheduling: number,
    closingAlternateScheduling: number,
  ): Promise<AlternateScheduling | null>

  abstract fetchAlternateSchedulings(
    params: PaginationParams,
  ): Promise<AlternateScheduling[]>

  abstract create(alternatescheduling: AlternateScheduling[]): Promise<void>
  abstract edit(alternatescheduling: AlternateScheduling): Promise<void>
  abstract delete(alternatescheduling: AlternateScheduling): Promise<void>
}
