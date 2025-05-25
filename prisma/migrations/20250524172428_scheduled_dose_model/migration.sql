-- CreateEnum
CREATE TYPE "DoseStatus" AS ENUM ('PENDING', 'TAKEN', 'SNOOZED', 'MISSED');

-- CreateTable
CREATE TABLE "scheduled_doses" (
    "id" TEXT NOT NULL,
    "medication_id" TEXT NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "status" "DoseStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scheduled_doses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "scheduled_doses" ADD CONSTRAINT "scheduled_doses_medication_id_fkey" FOREIGN KEY ("medication_id") REFERENCES "medications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
