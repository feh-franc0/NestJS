import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Scheduling, SchedulingProps } from './scheduling'

export interface UniqueDaySchedulingProps extends SchedulingProps {
  //* Ja tenho o ano-mes-dia-hora-minuto-seg de quando vai comecar e terminar a consulta
  startScheduleTimestamp: number // ano-mes-dia-hora-minuto que vai comecar
  closingScheduleTimestamp: number // ano-mes-dia-hora-minuto que vai terminar
}

export class UniqueDayScheduling extends Scheduling<UniqueDaySchedulingProps> {
  get startScheduleTimestamp() {
    return this.props.startScheduleTimestamp
  }

  get closingScheduleTimestamp() {
    return this.props.closingScheduleTimestamp
  }

  static create(props: UniqueDaySchedulingProps, id?: UniqueEntityID) {
    const uniquedayScheduling = new UniqueDayScheduling(
      {
        ...props,
      },
      id,
    )

    return uniquedayScheduling
  }
}
