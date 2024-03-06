import { PaginationParams } from '@/core/repositories/pagination-params'
import { AlternateSchedulingRepository } from '@/domain/schedulingManager/application/repositories/scheduling-alternate-days-repository'
import { AlternateScheduling } from '@/domain/schedulingManager/enterprise/entities/scheduling-alternate-days'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAlternateSchedulingRepository
  implements AlternateSchedulingRepository
{
  constructor(private prisma: PrismaService) {}

  findCheckAlternateSchedulingConflict(
    startAlternateScheduling: number,
    closingAlternateScheduling: number,
  ): Promise<AlternateScheduling | null> {
    throw new Error('Method not implemented.')
  }

  fetchAlternateSchedulings(
    params: PaginationParams,
  ): Promise<AlternateScheduling[]> {
    throw new Error('Method not implemented.')
  }

  create(alternatescheduling: AlternateScheduling[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  edit(alternatescheduling: AlternateScheduling): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(alternatescheduling: AlternateScheduling): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
