import Chat from "@/components/chat";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-400">
      <div className="w-[40rem] h-[40rem]">
        <Chat></Chat>
      </div>
    </div>
  );
}
