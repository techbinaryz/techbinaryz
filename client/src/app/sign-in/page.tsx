import Signin from "@/components/global/Signin";
import { signInMeta } from "@/data/sign-in.data";

export const metadata = signInMeta;

export default function page() {
  return (
    <div>
      <Signin />
    </div>
  );
}
