import SideNavbar from "@/components/chatbot/SideNavbar";

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideNavbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
