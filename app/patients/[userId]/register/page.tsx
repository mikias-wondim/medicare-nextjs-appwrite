import Image from "next/image";
import { redirect } from "next/navigation";
import { getPatient, getUser } from "@/lib/actions/patient.actions";
import RegisterForm from "@/components/froms/RegisterForm";
import Logo from "@/components/Logo";

const Register = async ({ params: { userId } }: any) => {
  const user = await getUser(userId);

  const patient = await getPatient(userId);

  if (patient) redirect(`/patients/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Logo />
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
