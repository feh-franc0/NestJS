import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AppointmentProps {
  companyId: string //* id: 'comp-1'
  patientId: string //* id: 'client-1'
  employeeId: string //* id: 'employee-1'
  address: string //* rua x, numero y, bloco z, apt w
  startAppointmentTimestamp: number //* 1705555738008
  finishAppointmentTimestamp: number //* 1705555738009
  appointmentResultId: string //* id: 'result-1'
}

export class Appointment extends Entity<AppointmentProps> {
  get companyId() {
    return this.props.companyId
  }

  get patientId() {
    return this.props.patientId
  }

  get employeeId() {
    return this.props.employeeId
  }

  get address() {
    return this.props.address
  }

  get startAppointmentTimestamp() {
    return this.props.startAppointmentTimestamp
  }

  get finishAppointmentTimestamp() {
    return this.props.finishAppointmentTimestamp
  }

  get appointmentResultId() {
    return this.props.appointmentResultId
  }

  static create(props: AppointmentProps, id?: UniqueEntityID) {
    const appointment = new Appointment({ ...props }, id)

    return appointment
  }
}
