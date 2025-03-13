import { PatientForm } from "@/components/froms/PatientForm";
import { PasskeyModal } from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

const Home = async ({ searchParams }: SearchParamProps) => {
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
