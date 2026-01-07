import { Loader2 } from "lucide-react";
const Loading = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#2b2538] z-50">
      <div className="flex flex-col items-center gap-y-4">
        <Loader2 className="h-12 w-12 text-purple-500 animate-spin" />

        <p className="text-white/80 font-sans text-lg animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};
export default Loading;
