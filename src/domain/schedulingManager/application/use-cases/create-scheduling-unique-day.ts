import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from './errors/already-exists-error'
import { InvalidTimestampOrderError } from './errors/invalid-timestamp-order-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UniqueDaySchedulingRepository } from '../repositories/scheduling-unique-day-repository'
import { UniqueDayScheduling } from '../../enterprise/entities/scheduling-unique-day'

interface CreateUniqueDaySchedulingUseCaseRequest {
  companyId: string
  patientId: string
  employeeId: string
  address: string
  startScheduleTimestamp: number
  closingScheduleTimestamp: number
}

type CreateUniqueDaySchedulingUseCaseResponse = Either<
  AlreadyExistsError | InvalidTimestampOrderError,
  {
    scheduling: UniqueDayScheduling
  }
>

export class CreateUniqueDaySchedulingUseCase {
  constructor(
    private uniqueDaySchedulingRepository: UniqueDaySchedulingRepository,
  ) {}

  async execute({
    companyId,
    patientId,
    employeeId,
    address,
    startScheduleTimestamp,
    closingScheduleTimestamp,
  }: CreateUniqueDaySchedulingUseCaseRequest): Promise<CreateUniqueDaySchedulingUseCaseResponse> {
    const schedulingAlreadyExists =
      await this.uniqueDaySchedulingRepository.findCheckUniqueDaySchedulingConflict(
        startScheduleTimestamp,
        closingScheduleTimestamp,
      )

    if (schedulingAlreadyExists) {
      return left(new AlreadyExistsError())
    }

    if (closingScheduleTimestamp < startScheduleTimestamp) {
      return left(new InvalidTimestampOrderError())
    }

    const scheduling = UniqueDayScheduling.create({
      companyId: new UniqueEntityID(companyId),
      patientId: new UniqueEntityID(patientId),
      employeeId: new UniqueEntityID(employeeId),
      address,
      startScheduleTimestamp,
      closingScheduleTimestamp,
    })

    await this.uniqueDaySchedulingRepository.create(scheduling)

    return right({
      scheduling,
    })
  }
}
