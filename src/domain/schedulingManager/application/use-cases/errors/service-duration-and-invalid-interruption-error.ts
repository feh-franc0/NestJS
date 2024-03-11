import { UseCaseError } from '@/core/errors/use-case-error'

export class ServiceDurationAndInvalidInterruptionError
  extends Error
  implements UseCaseError
{
  constructor() {
    super(`service time and time off must be defined`)
  }
}
