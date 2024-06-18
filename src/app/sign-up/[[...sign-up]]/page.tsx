import { SignUp } from "@clerk/nextjs";
import Header from "../../../components/Header";

export default function Page() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center w-full pt-24">
        <SignUp />
      </div>
    </>
  );
}
