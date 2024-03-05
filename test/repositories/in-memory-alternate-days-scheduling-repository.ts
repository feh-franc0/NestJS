import { PaginationParams } from '@/core/repositories/pagination-params'
import { AlternateSchedulingRepository } from '@/domain/schedulingManager/application/repositories/scheduling-alternate-days-repository'
import { AlternateScheduling } from '@/domain/schedulingManager/enterprise/entities/scheduling-alternate-days'

export class InMemoryAlternateSchedulingRepository
  implements AlternateSchedulingRepository
{
  public items: AlternateScheduling[] = []

  async findCheckAlternateSchedulingConflict(
    startAlternateScheduling: number,
    closingAlternateScheduling: number,
  ) {
    const conflict = this.items.find((scheduling) => {
      const startConflict =
        scheduling.startContractTimeStamp <= closingAlternateScheduling &&
        scheduling.closingContractTimeStamp >= startAlternateScheduling
      const endConflict =
        scheduling.closingContractTimeStamp >= startAlternateScheduling &&
        scheduling.startContractTimeStamp <= closingAlternateScheduling
      return startConflict || endConflict
    })

    if (!conflict) return null

    return conflict
  }

  async fetchAlternateSchedulings({
    page,
  }: PaginationParams): Promise<AlternateScheduling[]> {
    const schedulings = this.items.slice((page - 1) * 20, page * 20)

    return schedulings
  }

  async create(alternatescheduling: AlternateScheduling[]): Promise<void> {
    this.items.push(...alternatescheduling)
  }

  async edit(alternatescheduling: AlternateScheduling): Promise<void> {
    const itemIndex = this.items.findIndex((item) =>
      item.id.equals(alternatescheduling.id),
    )

    this.items[itemIndex] = alternatescheduling
  }

  async delete(alternatescheduling: AlternateScheduling): Promise<void> {
    const index = this.items.findIndex((item) =>
      item.id.equals(alternatescheduling.id),
    )
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }
}
