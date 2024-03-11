import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateAlternateDaysSchedulingRepositoryUseCase } from '@/domain/schedulingManager/application/use-cases/create-scheduling-alternate-days-repository'

type WeekDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

const weekDaySchema = z.enum([
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
])

const createDaysOfWeekSchedulingBodySchema = z.object({
  address: z.string(),
  closingContractTimeStamp: z.number(),
  startContractTimeStamp: z.number(),
  startHours: z.string(),
  closingHours: z.string(),
  employeeId: z.string(),
  patientId: z.string(),
  hoursOfServicePerConsultation: z.number(),
  hoursOfSpacingPerConsultation: z.number(),
  scheduledDaysWeek: z.array(weekDaySchema),
})

const bodyValidationPipe = new ZodValidationPipe(
  createDaysOfWeekSchedulingBodySchema,
)

type CreateDaysOfWeekSchedulingBodySchema = z.infer<
  typeof createDaysOfWeekSchedulingBodySchema
>

@Controller('/alternate-days-scheduling')
export class CreateDaysOfWeekSchedulingController {
  constructor(
    private createDaysOfWeekScheduling: CreateAlternateDaysSchedulingRepositoryUseCase,
  ) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateDaysOfWeekSchedulingBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      address,
      closingContractTimeStamp,
      startContractTimeStamp,
      startHours,
      closingHours,
      employeeId,
      hoursOfServicePerConsultation,
      hoursOfSpacingPerConsultation,
      patientId,
    } = body
    const userId = user.sub

    const result = await this.createDaysOfWeekScheduling.execute({
      address,
      closingContractTimeStamp,
      startContractTimeStamp,
      startHours,
      closingHours,
      companyId: userId,
      employeeId,
      hoursOfServicePerConsultation,
      hoursOfSpacingPerConsultation,
      patientId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
