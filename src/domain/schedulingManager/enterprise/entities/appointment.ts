import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export type AppointmentType = 'SINGLE' | 'WEEKLY' | 'HOURLY_INTERVAL'

export interface AppointmentProps {
  companyId: UniqueEntityID // ID da empresa
  patientId: UniqueEntityID // ID do paciente
  employeeId: UniqueEntityID // ID do funcionário
  address: string // Endereço do appointment
  startAppointmentTimestamp: number // Timestamp de início do appointment
  durationInMinutes: number // Duração da consulta em minutos
  appointmentResultId: string // ID do resultado da consulta
  type: AppointmentType // Tipo de consulta (ex: "SINGLE", "WEEKLY", "HOURLY_INTERVAL")
  notes?: string // Notas ou observações adicionais
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

  get durationInMinutes() {
    return this.props.durationInMinutes
  }

  get finishAppointmentTimestamp() {
    return (
      this.props.startAppointmentTimestamp +
      this.props.durationInMinutes * 60000
    ) // Convertendo minutos para milissegundos
  }

  get appointmentResultId() {
    return this.props.appointmentResultId
  }

  get type() {
    return this.props.type
  }

  get notes() {
    return this.props.notes
  }

  get endAppointmentTimestamp() {
    return (
      this.props.startAppointmentTimestamp +
      this.props.durationInMinutes * 60000
    )
  }

  static create(props: AppointmentProps, id?: UniqueEntityID) {
    const appointment = new Appointment({ ...props }, id)
    return appointment
  }

  // Método para formatar a data de início em um formato legível
  formattedStartAppointmentDate(): string {
    const startDate = new Date(this.props.startAppointmentTimestamp)
    return startDate.toLocaleString()
  }

  // Método para calcular a data de término com base na duração
  calculateFinishAppointmentDate(): Date {
    const finishDate = new Date(
      this.props.startAppointmentTimestamp +
        this.props.durationInMinutes * 60000,
    )
    return finishDate
  }
}
