import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Appointment, AppointmentProps } from './appointment'

export interface PatientAppointmentProps extends AppointmentProps {
  patientId: UniqueEntityID
}

export class PatientAppointment extends Appointment<PatientAppointmentProps> {
  get patientId() {
    return this.props.patientId
  }

  static create(
    props: Optional<PatientAppointmentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const patientAppointment = new PatientAppointment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return patientAppointment
  }
}
