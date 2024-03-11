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

  async findCheckDaysOfWeekSchedulingConflict(
    startDaysOfWeekScheduling: number,
    closingDaysOfWeekScheduling: number,
  ): Promise<DaysOfWeekScheduling | null> {
    // const scheduling = await this.prisma.appointment.findFirst({
    //   where: {
    //     start: startDaysOfWeekScheduling,
    //     closing: closingDaysOfWeekScheduling,
    //   },
    // })

    // return scheduling || null
    throw new Error('Method not implemented.')
  }

  async fetchDaysOfWeekSchedulings(
    params: PaginationParams,
  ): Promise<DaysOfWeekScheduling[]> {
    // const { page } = params
    // const skip = (page - 1) * 20
    // const schedulings = await this.prisma.appointment.findMany({
    //   skip,
    //   take: 20,
    // })
    // return schedulings
    throw new Error('Method not implemented.')
  }

  async create(daysofweekscheduling: DaysOfWeekScheduling[]): Promise<void> {
    // await this.prisma.appointment.createMany({
    // data: daysofweekscheduling.map((scheduling) => ({
    // Map your DaysOfWeekScheduling properties to Prisma model properties
    // Example: start: scheduling.start,
    //          closing: scheduling.closing,
    // })),
    // })
  }

  async edit(daysofweekscheduling: DaysOfWeekScheduling): Promise<void> {
    // Implement edit logic using Prisma update function
  }

  async delete(daysofweekscheduling: DaysOfWeekScheduling): Promise<void> {
    // Implement delete logic using Prisma delete function
  }
}
