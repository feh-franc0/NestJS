import { PaginationParams } from '@/core/repositories/pagination-params'
import { UniqueDaySchedulingRepository } from '@/domain/schedulingManager/application/repositories/scheduling-unique-day-repository'
import { UniqueDayScheduling } from '@/domain/schedulingManager/enterprise/entities/scheduling-unique-day'

export class InMemoryUniqueDaySchedulingRepository
  implements UniqueDaySchedulingRepository
{
  public items: UniqueDayScheduling[] = []

  async findCheckUniqueDaySchedulingConflict(
    startUniqueDayScheduling: number,
    closingUniqueDayScheduling: number,
  ) {
    const conflict = this.items.find((scheduling) => {
      const startConflict =
        scheduling.startScheduleTimestamp <= closingUniqueDayScheduling &&
        scheduling.closingScheduleTimestamp >= startUniqueDayScheduling
      const endConflict =
        scheduling.closingScheduleTimestamp >= startUniqueDayScheduling &&
        scheduling.startScheduleTimestamp <= closingUniqueDayScheduling
      return startConflict || endConflict
    })

    if (!conflict) return null

    return conflict
  }

  async fetchUniqueDaySchedulings({
    page,
  }: PaginationParams): Promise<UniqueDayScheduling[]> {
    const schedulings = this.items.slice((page - 1) * 20, page * 20)

    return schedulings
  }

  async create(uniquedayscheduling: UniqueDayScheduling): Promise<void> {
    this.items.push(uniquedayscheduling)
  }

  async edit(uniquedayscheduling: UniqueDayScheduling): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === uniquedayscheduling.id,
    )

    this.items[itemIndex] = uniquedayscheduling
  }

  async delete(uniquedayscheduling: UniqueDayScheduling): Promise<void> {
    const index = this.items.findIndex((item) =>
      item.id.equals(uniquedayscheduling.id),
    )
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
