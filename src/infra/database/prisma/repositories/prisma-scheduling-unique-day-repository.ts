import { PaginationParams } from '@/core/repositories/pagination-params'
import { UniqueDaySchedulingRepository } from '@/domain/schedulingManager/application/repositories/scheduling-unique-day-repository'
import { UniqueDayScheduling } from '@/domain/schedulingManager/enterprise/entities/scheduling-unique-day'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUniqueDaySchedulingRepository
  implements UniqueDaySchedulingRepository
{
  constructor(private prisma: PrismaService) {}

  findCheckUniqueDaySchedulingConflict(
    startUniqueDayScheduling: number,
    closingUniqueDayScheduling: number,
  ): Promise<UniqueDayScheduling | null> {
    throw new Error('Method not implemented.')
  }

  fetchUniqueDaySchedulings(
    params: PaginationParams,
  ): Promise<UniqueDayScheduling[]> {
    throw new Error('Method not implemented.')
  }

  create(uniquedayscheduling: UniqueDayScheduling): Promise<void> {
    throw new Error('Method not implemented.')
  }

  edit(uniquedayscheduling: UniqueDayScheduling): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(uniquedayscheduling: UniqueDayScheduling): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
