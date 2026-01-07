import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const LegalLayout = ({ title, icon, children }: any) => (
  <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
    <div className="max-w-3xl mx-auto px-6 py-20">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-8">
        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
          {icon}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
      </div>

      <div className="prose prose-invert prose-purple max-w-none">
        {children}
      </div>
    </div>
  </div>
);

export default LegalLayout;
