import { Either, left, right } from '@/core/either'
import { AlreadyExistsError } from './errors/already-exists-error'
import { InvalidTimestampOrderError } from './errors/invalid-timestamp-order-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DaysOfWeekScheduling } from '../../enterprise/entities/scheduling-days-of-week'
import { DaysOfWeekSchedulingRepository } from '../repositories/scheduling-days-of-week-repository'

type WeekDay =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'

interface CreateDaysOfWeekSchedulingUseCaseRequest {
  companyId: string
  patientId: string
  employeeId: string
  address: string
  startHours: string
  closingHours: string
  scheduledDaysWeek: WeekDay[]
  startContractTimeStamp: number
  closingContractTimeStamp: number
}

type CreateDaysOfWeekSchedulingUseCaseResponse = Either<
  AlreadyExistsError | InvalidTimestampOrderError,
  {
    scheduling: DaysOfWeekScheduling[]
  }
>

export class CreateDaysOfWeekSchedulingUseCase {
  constructor(
    private daysOfWeekSchedulingRepository: DaysOfWeekSchedulingRepository,
  ) {}

  async execute({
    companyId,
    patientId,
    employeeId,
    address,
    startHours,
    closingHours,
    scheduledDaysWeek,
    startContractTimeStamp,
    closingContractTimeStamp,
  }: CreateDaysOfWeekSchedulingUseCaseRequest): Promise<CreateDaysOfWeekSchedulingUseCaseResponse> {
    if (closingContractTimeStamp < startContractTimeStamp) {
      return left(new InvalidTimestampOrderError())
    }

    const generatedSchedules: DaysOfWeekScheduling[] = []

    const dayInMillis = 24 * 60 * 60 * 1000
    const numberOfDays = Math.floor(
      (closingContractTimeStamp - startContractTimeStamp) / dayInMillis,
    )

    for (let day = 0; day <= numberOfDays; day++) {
      const currentDayStart = startContractTimeStamp + day * dayInMillis

      for (const scheduledDay of scheduledDaysWeek) {
        const dayIndex = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ].indexOf(scheduledDay)

        if (dayIndex !== -1) {
          const scheduledStart = currentDayStart + dayIndex * dayInMillis
          const scheduledEnd = scheduledStart + dayInMillis

          const scheduling = DaysOfWeekScheduling.create({
            companyId: new UniqueEntityID(companyId),
            patientId: new UniqueEntityID(patientId),
            employeeId: new UniqueEntityID(employeeId),
            address,
            startHours,
            closingHours,
            scheduledDaysWeek: [scheduledDay],
            startContractTimeStamp: scheduledStart,
            closingContractTimeStamp: scheduledEnd,
          })

          generatedSchedules.push(scheduling)
        }
      }
    }

    await this.daysOfWeekSchedulingRepository.create(generatedSchedules)

    return right({
      scheduling: generatedSchedules,
    })
  }
}
