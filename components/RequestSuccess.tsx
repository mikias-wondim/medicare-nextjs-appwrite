// components/RequestSuccess.tsx (Client Component)
"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { formatDateTime, fireConfetti } from "@/lib/utils";

interface RequestSuccessProps {
  appointment: any;
  userId: string;
}

const RequestSuccess = ({ appointment, userId }: RequestSuccessProps) => {
  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  // Trigger confetti when the component mounts
  useEffect(() => {
    fireConfetti();
  }, []);

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link
          href={"/"}
          className="w-full mb-12 flex flex-col gap-2 items-center justify-center"
        >
          <Image
            src="/assets/icons/logo-full.png"
            height={1000}
            width={1000}
            alt="logo"
            className="h-14 w-fit"
          />
          <span className="text-2xl font-heading font-semibold">MediCare</span>
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
              className="invert dark:invert-0"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button
          className="shad-primary-btn bg-green-500 hover:bg-green-500/80 dark:text-white dark:bg-green-500 dark:hover:bg-green-500/80"
          asChild
        >
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© {new Date().getFullYear()} MediCare</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
