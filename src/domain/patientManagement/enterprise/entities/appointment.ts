import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AppointmentProps {
  companyId: UniqueEntityID
  patientId: UniqueEntityID
  employeeId: UniqueEntityID
  residenceAddress: string
  initialConsultDate: number
  finalConsultDate: number
  consultationFee: string

  createdAt: Date
  updatedAt?: Date | null
}

export abstract class Appointment<
  Props extends AppointmentProps,
> extends Entity<Props> {
  get companyId() {
    return this.props.companyId
  }

  get patientId() {
    return this.props.patientId
  }

  get employeeId() {
    return this.props.employeeId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get residenceAddress() {
    return this.props.residenceAddress
  }

  set residenceAddress(residenceAddress: string) {
    this.props.residenceAddress = residenceAddress
    this.touch()
  }

  get initialConsultDate() {
    return this.props.initialConsultDate
  }

  set initialConsultDate(initialConsultDate: number) {
    this.props.initialConsultDate = initialConsultDate
    this.touch()
  }

  get finalConsultDate() {
    return this.props.finalConsultDate
  }

  set finalConsultDate(finalConsultDate: number) {
    this.props.finalConsultDate = finalConsultDate
    this.touch()
  }

  get consultationFee() {
    return this.props.consultationFee
  }

  set consultationFee(consultationFee: string) {
    this.props.consultationFee = consultationFee
    this.touch()
  }
}
