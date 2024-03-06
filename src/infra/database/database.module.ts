import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-question-repository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachments-repository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository'
import { CacheModule } from '../cache/cache.module'
import { PrismaEmployeeRepository } from './prisma/repositories/prisma-employee-repository'
import { PrismaPatientAttachmentsRepository } from './prisma/repositories/prisma-patient-attachments-repository'
import { PrismaPatientRepository } from './prisma/repositories/prisma-patient-repository'
import { PrismaAlternateSchedulingRepository } from './prisma/repositories/prisma-scheduling-alternate-days-repository'
import { PrismaDaysOfWeekSchedulingRepository } from './prisma/repositories/prisma-scheduling-days-of-week-repository'
import { PrismaUniqueDaySchedulingRepository } from './prisma/repositories/prisma-scheduling-unique-day-repository'
import { PatientRepository } from '@/domain/patientManagement/application/repositories/patient-repository'
import { PatientAttachmentsRepository } from '@/domain/patientManagement/application/repositories/patient-attachments-repository'
import { EmployeeRepository } from '@/domain/employeeManagement/application/repositories/employee-repository'

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    PrismaAlternateSchedulingRepository,
    PrismaDaysOfWeekSchedulingRepository,
    PrismaUniqueDaySchedulingRepository,
    {
      provide: EmployeeRepository,
      useClass: PrismaEmployeeRepository,
    },
    {
      provide: PatientAttachmentsRepository,
      useClass: PrismaPatientAttachmentsRepository,
    },
    {
      provide: PatientRepository,
      useClass: PrismaPatientRepository,
    },
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    QuestionCommentsRepository,
    QuestionAttachmentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    AnswerAttachmentsRepository,
    AttachmentsRepository,
    NotificationsRepository,
    EmployeeRepository,
    PatientAttachmentsRepository,
    PatientRepository,
    PrismaAlternateSchedulingRepository,
    PrismaDaysOfWeekSchedulingRepository,
    PrismaUniqueDaySchedulingRepository,
  ],
})
export class DatabaseModule {}
