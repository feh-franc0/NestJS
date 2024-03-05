import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Scheduling, SchedulingProps } from './scheduling'

export interface DaysOfWeekSchedulingProps extends SchedulingProps {
  scheduledDaysWeek: string[] // Dias da semana (por exemplo, ['Monday', 'Thursday'])

  startHours: string
  closingHours: string //* startHours + (tempo estimado [0:30] [1:00] [2:00])

  startContractTimeStamp: number
  closingContractTimeStamp: number
}

export class DaysOfWeekScheduling extends Scheduling<DaysOfWeekSchedulingProps> {
  get scheduledDaysWeek() {
    return this.props.scheduledDaysWeek
  }

  get startHours() {
    return this.props.startHours
  }

  get closingHours() {
    return this.props.closingHours
  }

  get startContractTimeStamp() {
    return this.props.startContractTimeStamp
  }

  get closingContractTimeStamp() {
    return this.props.closingContractTimeStamp
  }

  static create(props: DaysOfWeekSchedulingProps, id?: UniqueEntityID) {
    const daysofweekScheduling = new DaysOfWeekScheduling(
      {
        ...props,
      },
      id,
    )

    return daysofweekScheduling
  }
}
