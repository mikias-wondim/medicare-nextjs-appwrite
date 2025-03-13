import Image from "next/image";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn(
        className,
        "bg-green-500 dark:bg-green-500 hover:bg-green-500/80 hover:dark:bg-green-500/80  w-full cursor-pointer"
      )}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
