-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "userName" TEXT,
    "email" TEXT,
    "photoUrl" TEXT,
    "role" TEXT,
    "address" TEXT,
    "companyId" TEXT,
    "storeImageUrl" TEXT,
    "staffImageUrl" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Time" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "Time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserve" (
    "id" TEXT NOT NULL,
    "staff" TEXT NOT NULL,
    "reserver" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "time" INTEGER NOT NULL,
    "reserved" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderUid" TEXT,
    "reserverUid" TEXT,
    "email" TEXT,
    "phoneNumber" INTEGER,
    "authorId" TEXT,

    CONSTRAINT "Reserve_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Time" ADD CONSTRAINT "Time_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserve" ADD CONSTRAINT "Reserve_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
