import Signin from "@/components/global/Signin";
import { signInMeta } from "@/data/metadata/sign-in.data";

export const metadata = signInMeta;

export default function page() {
  return (
    <div className="min-h-screen">
      <Signin />
    </div>
  );
}
