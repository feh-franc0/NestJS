import { UseCaseError } from '@/core/errors/use-case-error'

export class PasswordMismatchError extends Error implements UseCaseError {
  constructor() {
    super('Password mismatch error')
  }
}
