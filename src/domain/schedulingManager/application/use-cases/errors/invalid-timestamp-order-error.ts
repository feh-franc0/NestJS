import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidTimestampOrderError extends Error implements UseCaseError {
  constructor() {
    super('Invalid Timestamp Order Error ')
  }
}
