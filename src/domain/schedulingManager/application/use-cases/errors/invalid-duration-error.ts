import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidDurationError extends Error implements UseCaseError {
  constructor(durationAppointmentInMinutes: number) {
    super(
      `The duration of the appointment cannot be less than ${durationAppointmentInMinutes} minutes`,
    )
  }
}
