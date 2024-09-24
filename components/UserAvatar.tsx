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
      <span>{session.user.name}</span>
      <span>{session.user.email}</span>
    </div>
  );
}

//获取到的用户头像需要在后续的Header进行加载
//必须在next.config.mjs中设置使用github的头像图片
//这里需要特别去设计一下样式，以保证在ChatBot的显示效果用户友好
//目前未在任何地方使用
//注意，在页面中获取session需要在layout.tsx中加一个包裹页面的全局环境
