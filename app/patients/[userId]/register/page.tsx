import Image from "next/image";
import { redirect } from "next/navigation";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import RegisterForm from "@/components/froms/RegisterForm";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  const patient = await getPatient(userId);

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <div className="w-full mb-12 flex gap-2 items-center justify-start">
            <Image
              src="/assets/icons/logo-full.png"
              height={1000}
              width={1000}
              alt="logo"
              className="h-14 w-fit"
            />
            <span className="text-2xl font-heading font-semibold">
              MediCare
            </span>
          </div>

          <RegisterForm user={user} />

          <p className="copyright py-12">
            © {new Date().getFullYear()} MediCare
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/registeration-2.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img hidden md:block md:max-w-[30%] xl:max-w-[40%] object-contain p-5"
      />
    </div>
  );
};

export default Register;
