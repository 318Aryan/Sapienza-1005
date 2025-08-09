import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/physics.svg"
            alt="Physics"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Physics
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/maths.svg"
            alt="Maths"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Matematics
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/chemistry.svg"
            alt="Chemistry"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Chemistry
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/hindi.svg"
            alt="Hindi"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Hindi
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image
            src="/commerce.svg"
            alt="Commerce"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Commerce
        </Button>
      </div>
    </footer>
  );
};
