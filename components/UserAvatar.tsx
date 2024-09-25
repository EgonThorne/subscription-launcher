import { auth } from "@/lib/auth";
import Image from "next/image";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <Image
        src={session?.user?.image ?? "https://i.pravatar.cc/300"}
        alt="User Avatar"
        width={35}
        height={35}
        className=" rounded-full"
      />
    </div>
  );
}
