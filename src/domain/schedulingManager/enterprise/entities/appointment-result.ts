import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AppointmentResultProps {
  appointmentId: string
  employeeId: string
  title: string
  description: string
  attachments: string[]
}

export class AppointmentResult extends Entity<AppointmentResultProps> {
  get appointmentId() {
    return this.props.appointmentId
  }

  get employeeId() {
    return this.props.employeeId
  }

  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get attachments() {
    return this.props.attachments
  }

  static create(
    props: Optional<AppointmentResultProps, 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const appointmentresult = new AppointmentResult(
      { ...props, attachments: props.attachments || [] },
      id,
    )

    return appointmentresult
  }
}
