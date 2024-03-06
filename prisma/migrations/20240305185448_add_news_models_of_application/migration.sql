-- CreateEnum
CREATE TYPE "AlergyRestrictionType" AS ENUM ('ALLERGY', 'RESTRICTION');

-- CreateEnum
CREATE TYPE "MedicationType" AS ENUM ('DROP', 'PILL');

-- CreateTable
CREATE TABLE "Company" (
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "acceptsInsurances" TEXT[],
    "subscriptionPlans" TEXT[]
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "comorbidityTypes" TEXT[],
    "relativeName" TEXT NOT NULL,
    "elderlyName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "importantPhones" TEXT[],
    "email" TEXT NOT NULL,
    "cpfDocuments" TEXT NOT NULL,
    "pdfPhotoFiles" TEXT[],
    "patientCode" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "lastAppointment" TEXT NOT NULL,
    "insurance" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlergiesRestrictions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AlergyRestrictionType" NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "AlergiesRestrictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" SERIAL NOT NULL,
    "patientId" TEXT NOT NULL,
    "examName" TEXT NOT NULL,
    "professionalName" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "doctorSignature" TEXT NOT NULL,
    "pdfPhotoDocument" TEXT NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MedicationType" NOT NULL,
    "dose" TEXT NOT NULL,
    "timing" TEXT NOT NULL,
    "prescriptionId" INTEGER NOT NULL,
    "patientId" INTEGER,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prescription" (
    "id" SERIAL NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorSignature" TEXT NOT NULL,
    "pdfPhotoDocument" TEXT NOT NULL,

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpfDocuments" TEXT NOT NULL,
    "employeeCode" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "birthDate" TEXT NOT NULL,
    "gender" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "companyId" TEXT NOT NULL,
    "residenceAddress" TEXT NOT NULL,
    "initialConsultDate" TEXT NOT NULL,
    "finalConsultDate" TEXT NOT NULL,
    "consultationFee" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "dailyScheduledPatientsCount" INTEGER NOT NULL,
    "futureConsultationsCount" INTEGER NOT NULL,
    "patientsConfirmedDayBefore" INTEGER NOT NULL,
    "doneAppointmentsCount" INTEGER NOT NULL,
    "cancelledAppointmentsCount" INTEGER NOT NULL,
    "patientsBeingAttendedCount" INTEGER NOT NULL,
    "remarketingMessagesSent" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "consultationCount" INTEGER NOT NULL,
    "cancelledConsultations" INTEGER NOT NULL,
    "attendedConsultations" INTEGER NOT NULL,
    "rescheduledConsultations" INTEGER NOT NULL,
    "consultationsToBeDone" INTEGER NOT NULL,
    "lineReportId" INTEGER NOT NULL,
    "pieReportId" INTEGER NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Financial" (
    "id" SERIAL NOT NULL,
    "financialTransaction" TEXT NOT NULL,
    "transactionType" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "billing" TEXT NOT NULL,
    "accountsPayable" TEXT NOT NULL,
    "accountsReceivable" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "payerName" TEXT NOT NULL,
    "payeeName" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "issuanceDueDate" TEXT NOT NULL,
    "supportingDocuments" TEXT[],
    "printStatement" TEXT NOT NULL,

    CONSTRAINT "Financial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APPOINTMENTZAP" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "initialDescription" TEXT NOT NULL,

    CONSTRAINT "APPOINTMENTZAP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CAMPAIGNZAP" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "campaignText" TEXT NOT NULL,
    "recipients" TEXT[],

    CONSTRAINT "CAMPAIGNZAP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MagazineNewsletter" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "MagazineNewsletter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientAssistanceChatbot" (
    "id" SERIAL NOT NULL,
    "magazineNewsletterId" INTEGER,
    "customerSatisfactionId" INTEGER,

    CONSTRAINT "PatientAssistanceChatbot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerSatisfaction" (
    "id" SERIAL NOT NULL,
    "patientName" TEXT NOT NULL,
    "employeeName" TEXT NOT NULL,
    "employeeEvaluation" TEXT NOT NULL,
    "companyEvaluation" TEXT NOT NULL,
    "satisfactionLevel" INTEGER NOT NULL,
    "satisfactionMessage" TEXT NOT NULL,
    "patientAssistanceChatbotId" INTEGER,

    CONSTRAINT "CustomerSatisfaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "noticeType" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "noticeEndDate" TEXT NOT NULL,
    "noticeMessage" TEXT NOT NULL,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NewsletterChatbot" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Exam_patientId_key" ON "Exam"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_NewsletterChatbot_AB_unique" ON "_NewsletterChatbot"("A", "B");

-- CreateIndex
CREATE INDEX "_NewsletterChatbot_B_index" ON "_NewsletterChatbot"("B");

-- AddForeignKey
ALTER TABLE "AlergiesRestrictions" ADD CONSTRAINT "AlergiesRestrictions_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "Prescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_lineReportId_fkey" FOREIGN KEY ("lineReportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_pieReportId_fkey" FOREIGN KEY ("pieReportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerSatisfaction" ADD CONSTRAINT "CustomerSatisfaction_patientAssistanceChatbotId_fkey" FOREIGN KEY ("patientAssistanceChatbotId") REFERENCES "PatientAssistanceChatbot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsletterChatbot" ADD CONSTRAINT "_NewsletterChatbot_A_fkey" FOREIGN KEY ("A") REFERENCES "MagazineNewsletter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsletterChatbot" ADD CONSTRAINT "_NewsletterChatbot_B_fkey" FOREIGN KEY ("B") REFERENCES "PatientAssistanceChatbot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
