import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchEmployeeUseCase } from '@/domain/employeeManagement/application/use-cases/fetch-employees'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/employees')
export class FetchEmployeeController {
  constructor(private fetchRecentEmployee: FetchEmployeeUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentEmployee.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const employee = result.value.employees

    // return { employee: employee.map(QuesitonPresenter.toHTTP) }
    return employee
  }
}
