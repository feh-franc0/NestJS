import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Appointment,
  AppointmentProps,
} from '@/domain/schedulingManager/enterprise/entities/appointment'

export function makeAppointment(
  override: Partial<AppointmentProps> = {},
  id?: UniqueEntityID,
) {
  const appointment = Appointment.create(
    {
      companyId: new UniqueEntityID('1'),
      patientId: new UniqueEntityID('1'),
      employeeId: new UniqueEntityID('1'),
      address: faker.internet.userName(),
      startAppointmentTimestamp: new Date('2020-01-01').getTime(),
      durationInMinutes: 30,
      appointmentResultId: '',
      type: 'SINGLE', //  "SINGLE" | "WEEKLY" | "HOURLY_INTERVAL"
      notes: 'string', // Notas ou observações adicionais
      ...override,
    },
    id,
  )

  return appointment
}
