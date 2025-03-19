import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="w-full mb-12 flex gap-2 items-center justify-start"
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
  );
}
