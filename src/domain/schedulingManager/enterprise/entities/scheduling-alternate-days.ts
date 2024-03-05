import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Scheduling, SchedulingProps } from './scheduling'

export interface AlternateSchedulingProps extends SchedulingProps {
  hoursOfServicePerConsultation: number // 2 dias sim
  hoursOfSpacingPerConsultation: number // 3 day nao

  startContractTimeStamp: number // comeco do trabalho
  closingContractTimeStamp: number // finalizacao do trabalho

  // startContractTimeStamp + 48 , folga 3*24, trabalha + 48

  // startHours: string
  // closingHours: string
}

export class AlternateScheduling extends Scheduling<AlternateSchedulingProps> {
  get hoursOfServicePerConsultation() {
    return this.props.hoursOfServicePerConsultation
  }

  get hoursOfSpacingPerConsultation() {
    return this.props.hoursOfSpacingPerConsultation
  }

  get startContractTimeStamp() {
    return this.props.startContractTimeStamp
  }

  get closingContractTimeStamp() {
    return this.props.closingContractTimeStamp
  }

  static create(props: AlternateSchedulingProps, id?: UniqueEntityID) {
    const alternateScheduling = new AlternateScheduling(
      {
        ...props,
      },
      id,
    )

    return alternateScheduling
  }
}
