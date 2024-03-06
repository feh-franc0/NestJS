/*
  Warnings:

  - The primary key for the `AlergiesRestrictions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `APPOINTMENTZAP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CAMPAIGNZAP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Consultation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomerSatisfaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Financial` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MagazineNewsletter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Medication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Patient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatientAssistanceChatbot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prescription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AlergiesRestrictions" DROP CONSTRAINT "AlergiesRestrictions_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_lineReportId_fkey";

-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_pieReportId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerSatisfaction" DROP CONSTRAINT "CustomerSatisfaction_patientAssistanceChatbotId_fkey";

-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_prescriptionId_fkey";

-- DropForeignKey
ALTER TABLE "_NewsletterChatbot" DROP CONSTRAINT "_NewsletterChatbot_A_fkey";

-- DropForeignKey
ALTER TABLE "_NewsletterChatbot" DROP CONSTRAINT "_NewsletterChatbot_B_fkey";

-- AlterTable
ALTER TABLE "AlergiesRestrictions" DROP CONSTRAINT "AlergiesRestrictions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "patientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AlergiesRestrictions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AlergiesRestrictions_id_seq";

-- AlterTable
ALTER TABLE "_NewsletterChatbot" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "APPOINTMENTZAP";

-- DropTable
DROP TABLE "Appointment";

-- DropTable
DROP TABLE "CAMPAIGNZAP";

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Consultation";

-- DropTable
DROP TABLE "CustomerSatisfaction";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Exam";

-- DropTable
DROP TABLE "Financial";

-- DropTable
DROP TABLE "MagazineNewsletter";

-- DropTable
DROP TABLE "Medication";

-- DropTable
DROP TABLE "Notice";

-- DropTable
DROP TABLE "Patient";

-- DropTable
DROP TABLE "PatientAssistanceChatbot";

-- DropTable
DROP TABLE "Prescription";

-- DropTable
DROP TABLE "Report";

-- CreateTable
CREATE TABLE "Companies" (
    "cnpj" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "acceptsInsurances" TEXT[],
    "subscriptionPlans" TEXT[]
);

-- CreateTable
CREATE TABLE "Patients" (
    "id" TEXT NOT NULL,
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

    CONSTRAINT "Patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exams" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "examName" TEXT NOT NULL,
    "professionalName" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "doctorSignature" TEXT NOT NULL,
    "pdfPhotoDocument" TEXT NOT NULL,

    CONSTRAINT "Exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MedicationType" NOT NULL,
    "dose" TEXT NOT NULL,
    "timing" TEXT NOT NULL,
    "prescriptionId" TEXT NOT NULL,
    "patientId" TEXT,

    CONSTRAINT "Medications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prescriptions" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorSignature" TEXT NOT NULL,
    "pdfPhotoDocument" TEXT NOT NULL,

    CONSTRAINT "Prescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employees" (
    "id" TEXT NOT NULL,
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

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "residenceAddress" TEXT NOT NULL,
    "initialConsultDate" TEXT NOT NULL,
    "finalConsultDate" TEXT NOT NULL,
    "consultationFee" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reports" (
    "id" TEXT NOT NULL,
    "dailyScheduledPatientsCount" INTEGER NOT NULL,
    "futureConsultationsCount" INTEGER NOT NULL,
    "patientsConfirmedDayBefore" INTEGER NOT NULL,
    "doneAppointmentsCount" INTEGER NOT NULL,
    "cancelledAppointmentsCount" INTEGER NOT NULL,
    "patientsBeingAttendedCount" INTEGER NOT NULL,
    "remarketingMessagesSent" INTEGER NOT NULL,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultations" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "consultationCount" INTEGER NOT NULL,
    "cancelledConsultations" INTEGER NOT NULL,
    "attendedConsultations" INTEGER NOT NULL,
    "rescheduledConsultations" INTEGER NOT NULL,
    "consultationsToBeDone" INTEGER NOT NULL,
    "lineReportId" TEXT NOT NULL,
    "pieReportId" TEXT NOT NULL,

    CONSTRAINT "Consultations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Financials" (
    "id" TEXT NOT NULL,
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

    CONSTRAINT "Financials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APPOINTMENTZAPs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "initialDescription" TEXT NOT NULL,

    CONSTRAINT "APPOINTMENTZAPs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CAMPAIGNZAPs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "campaignText" TEXT NOT NULL,
    "recipients" TEXT[],

    CONSTRAINT "CAMPAIGNZAPs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MagazineNewsletters" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "MagazineNewsletters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientAssistanceChatbots" (
    "id" TEXT NOT NULL,
    "magazineNewsletterId" TEXT,
    "customerSatisfactionId" TEXT,

    CONSTRAINT "PatientAssistanceChatbots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerSatisfactions" (
    "id" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "employeeName" TEXT NOT NULL,
    "employeeEvaluation" TEXT NOT NULL,
    "companyEvaluation" TEXT NOT NULL,
    "satisfactionLevel" INTEGER NOT NULL,
    "satisfactionMessage" TEXT NOT NULL,
    "patientAssistanceChatbotId" TEXT,

    CONSTRAINT "CustomerSatisfactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notices" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "noticeType" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "noticeEndDate" TEXT NOT NULL,
    "noticeMessage" TEXT NOT NULL,

    CONSTRAINT "Notices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Companies_email_key" ON "Companies"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patients_email_key" ON "Patients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Exams_patientId_key" ON "Exams"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_email_key" ON "Employees"("email");

-- AddForeignKey
ALTER TABLE "AlergiesRestrictions" ADD CONSTRAINT "AlergiesRestrictions_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medications" ADD CONSTRAINT "Medications_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "Prescriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medications" ADD CONSTRAINT "Medications_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultations" ADD CONSTRAINT "Consultations_lineReportId_fkey" FOREIGN KEY ("lineReportId") REFERENCES "Reports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultations" ADD CONSTRAINT "Consultations_pieReportId_fkey" FOREIGN KEY ("pieReportId") REFERENCES "Reports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerSatisfactions" ADD CONSTRAINT "CustomerSatisfactions_patientAssistanceChatbotId_fkey" FOREIGN KEY ("patientAssistanceChatbotId") REFERENCES "PatientAssistanceChatbots"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsletterChatbot" ADD CONSTRAINT "_NewsletterChatbot_A_fkey" FOREIGN KEY ("A") REFERENCES "MagazineNewsletters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsletterChatbot" ADD CONSTRAINT "_NewsletterChatbot_B_fkey" FOREIGN KEY ("B") REFERENCES "PatientAssistanceChatbots"("id") ON DELETE CASCADE ON UPDATE CASCADE;
