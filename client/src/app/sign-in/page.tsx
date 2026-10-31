import Signin from "@/components/global/Signin";
import { signInMeta } from "@/data/metadata/sign-in.data";

export const metadata = signInMeta;

export default function page() {
  return (
    <div>
      <Signin />
    </div>
  );
}
