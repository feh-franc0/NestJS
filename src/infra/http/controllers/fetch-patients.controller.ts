import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchPatientsUseCase } from '@/domain/patientManagement/application/use-cases/fetch-patients'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/patients')
export class FetchPatientsController {
  constructor(private fetchRecentPatient: FetchPatientsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentPatient.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const patients = result.value.patients

    // return { patients: patients.map(QuesitonPresenter.toHTTP) }
    return patients
  }
}
