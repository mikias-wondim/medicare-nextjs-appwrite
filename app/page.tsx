import { PatientForm } from "@/components/froms/PatientForm";
import Logo from "@/components/Logo";
import { PasskeyModal } from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

const Home = async ({ searchParams }: any) => {
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <Image
        src="/assets/images/root-page.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%] max-h-[70%] my-auto object-contain "
      />
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Logo />
          <PatientForm />
          <div className="mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © {new Date().getFullYear()} CarePluse
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
