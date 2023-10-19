import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { QuesitonPresenter } from '../presenters/question-presenter'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private fetchRecentQuestion: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.fetchRecentQuestion.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { question: QuesitonPresenter.toHTTP(result.value.question) }
  }
}
