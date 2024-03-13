import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateUniqueDaySchedulingUseCase } from '@/domain/schedulingManager/application/use-cases/create-scheduling-unique-day'

const createDaysOfWeekSchedulingBodySchema = z.object({
  address: z.string(),
  startScheduleTimestamp: z.number(),
  closingScheduleTimestamp: z.number(),
  employeeId: z.string(),
  patientId: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(
  createDaysOfWeekSchedulingBodySchema,
)

type CreateDaysOfWeekSchedulingBodySchema = z.infer<
  typeof createDaysOfWeekSchedulingBodySchema
>

@Controller('/days-of-week-scheduling')
export class CreateSchedulingUniqueDayController {
  constructor(
    private createDaysOfWeekScheduling: CreateUniqueDaySchedulingUseCase,
  ) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateDaysOfWeekSchedulingBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      address,
      startScheduleTimestamp,
      closingScheduleTimestamp,
      employeeId,
      patientId,
    } = body
    const userId = user.sub

    const result = await this.createDaysOfWeekScheduling.execute({
      address,
      companyId: userId,
      employeeId,
      patientId,
      startScheduleTimestamp,
      closingScheduleTimestamp,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
