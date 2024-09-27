import SideNavbar from "@/components/chatbot/SideNavbar";
import { SessionProvider } from "next-auth/react";

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="flex">
        <SideNavbar />
        <div className="flex-1">{children}</div>
      </div>
    </SessionProvider>
  );
}
