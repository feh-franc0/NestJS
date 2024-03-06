import { PaginationParams } from '@/core/repositories/pagination-params'
import { DaysOfWeekSchedulingRepository } from '@/domain/schedulingManager/application/repositories/scheduling-days-of-week-repository'
import { DaysOfWeekScheduling } from '@/domain/schedulingManager/enterprise/entities/scheduling-days-of-week'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaDaysOfWeekSchedulingRepository
  implements DaysOfWeekSchedulingRepository
{
  constructor(private prisma: PrismaService) {}

  findCheckDaysOfWeekSchedulingConflict(
    startDaysOfWeekScheduling: number,
    closingDaysOfWeekScheduling: number,
  ): Promise<DaysOfWeekScheduling | null> {
    throw new Error('Method not implemented.')
  }

  fetchDaysOfWeekSchedulings(
    params: PaginationParams,
  ): Promise<DaysOfWeekScheduling[]> {
    throw new Error('Method not implemented.')
  }

  create(daysofweekscheduling: DaysOfWeekScheduling[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  edit(daysofweekscheduling: DaysOfWeekScheduling): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(daysofweekscheduling: DaysOfWeekScheduling): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
