import Header from "@/components/header";

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex">
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
