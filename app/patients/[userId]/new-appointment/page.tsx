import Image from "next/image";
import { getPatient } from "@/lib/actions/patient.actions";
import { AppointmentForm } from "@/components/froms/AppointmentForm";
import Logo from "@/components/Logo";

const Appointment = async ({ params }: any) => {
  // Await params before accessing userId
  const { userId } = await params; // This will ensure params are resolved properly
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Logo />

          <AppointmentForm
            patientId={patient?.$id}
            patientName={patient?.name}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">
            © {new Date().getFullYear()} MediCare
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="hidden md:block object-contain md:max-w-[30%] xl:max-w-[40%] my-auto max-h-[90%] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
