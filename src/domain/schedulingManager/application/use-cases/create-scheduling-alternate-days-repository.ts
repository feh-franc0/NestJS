import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from './errors/already-exists-error'
import { InvalidTimestampOrderError } from './errors/invalid-timestamp-order-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AlternateSchedulingRepository } from '../repositories/scheduling-alternate-days-repository'
import {
  AlternateScheduling,
  AlternateSchedulingProps,
} from '../../enterprise/entities/scheduling-alternate-days'

interface CreateAlternateDaysSchedulingRepositoryUseCaseRequest {
  companyId: string
  patientId: string
  employeeId: string
  address: string
  startHours: string
  closingHours: string
  hoursOfServicePerConsultation: number
  hoursOfSpacingPerConsultation: number
  startContractTimeStamp: number
  closingContractTimeStamp: number
}

type CreateAlternateDaysSchedulingRepositoryUseCaseResponse = Either<
  AlreadyExistsError | InvalidTimestampOrderError,
  {
    scheduledSchedulingAlternateDays: AlternateScheduling[]
  }
>

export class CreateAlternateDaysSchedulingRepositoryUseCase {
  constructor(
    private alternateSchedulingRepository: AlternateSchedulingRepository,
  ) {}

  async execute({
    companyId,
    patientId,
    employeeId,
    address,
    startHours,
    closingHours,
    hoursOfServicePerConsultation,
    hoursOfSpacingPerConsultation,
    startContractTimeStamp,
    closingContractTimeStamp,
  }: CreateAlternateDaysSchedulingRepositoryUseCaseRequest): Promise<CreateAlternateDaysSchedulingRepositoryUseCaseResponse> {
    if (closingContractTimeStamp < startContractTimeStamp) {
      return left(new InvalidTimestampOrderError())
    }

    const generatedSchedules: AlternateScheduling[] = []

    const dayInMillis = 24 * 60 * 60 * 1000
    const numberOfDays = Math.floor(
      (closingContractTimeStamp - startContractTimeStamp) / dayInMillis,
    )

    for (let day = 0; day <= numberOfDays; day++) {
      const currentDayStart = startContractTimeStamp + day * dayInMillis

      const scheduledStart = currentDayStart + hoursToMilliseconds(startHours)
      const scheduledEnd = scheduledStart + hoursToMilliseconds(closingHours)

      const schedulingProps: AlternateSchedulingProps = {
        companyId: new UniqueEntityID(companyId),
        patientId: new UniqueEntityID(patientId),
        employeeId: new UniqueEntityID(employeeId),
        address,
        hoursOfServicePerConsultation,
        hoursOfSpacingPerConsultation,
        startContractTimeStamp: scheduledStart,
        closingContractTimeStamp: scheduledEnd,
      }

      const schedulingAlreadyExists =
        await this.alternateSchedulingRepository.findCheckAlternateSchedulingConflict(
          scheduledStart,
          scheduledEnd,
        )

      if (!schedulingAlreadyExists) {
        const scheduling = AlternateScheduling.create(schedulingProps)
        generatedSchedules.push(scheduling)
      }
    }

    await this.alternateSchedulingRepository.create(generatedSchedules)
    return right({
      scheduledSchedulingAlternateDays: generatedSchedules,
    })
  }
}

function hoursToMilliseconds(hours: string): number {
  const [hour, minute] = hours.split(':').map(Number)
  return hour * 60 * 60 * 1000 + minute * 60 * 1000
}
