import { PaginationParams } from '@/core/repositories/pagination-params'
import { DaysOfWeekSchedulingRepository } from '@/domain/schedulingManager/application/repositories/scheduling-days-of-week-repository'
import { DaysOfWeekScheduling } from '@/domain/schedulingManager/enterprise/entities/scheduling-days-of-week'

export class InMemoryDaysOfWeekSchedulingRepository
  implements DaysOfWeekSchedulingRepository
{
  public items: DaysOfWeekScheduling[] = []

  async findCheckDaysOfWeekSchedulingConflict(
    startDaysOfWeekScheduling: number,
    closingDaysOfWeekScheduling: number,
  ) {
    const conflict = this.items.find((scheduling) => {
      const startConflict =
        scheduling.startContractTimeStamp <= closingDaysOfWeekScheduling &&
        scheduling.closingContractTimeStamp >= startDaysOfWeekScheduling
      const endConflict =
        scheduling.closingContractTimeStamp >= startDaysOfWeekScheduling &&
        scheduling.startContractTimeStamp <= closingDaysOfWeekScheduling
      return startConflict || endConflict
    })

    if (!conflict) return null

    return conflict
  }

  async fetchDaysOfWeekSchedulings({
    page,
  }: PaginationParams): Promise<DaysOfWeekScheduling[]> {
    const schedulings = this.items.slice((page - 1) * 20, page * 20)

    return schedulings
  }

  async create(daysofweekscheduling: DaysOfWeekScheduling[]): Promise<void> {
    this.items.push(...daysofweekscheduling)
  }

  async edit(daysofweekscheduling: DaysOfWeekScheduling): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === daysofweekscheduling.id,
    )

    this.items[itemIndex] = daysofweekscheduling
  }

  async delete(daysofweekscheduling: DaysOfWeekScheduling): Promise<void> {
    const index = this.items.findIndex((item) =>
      item.id.equals(daysofweekscheduling.id),
    )
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
