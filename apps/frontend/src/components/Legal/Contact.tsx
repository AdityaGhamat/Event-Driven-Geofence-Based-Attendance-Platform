import { Mail } from "lucide-react";
import LegalLayout from "../../layouts/LegalLayout";

const Contact = () => (
  <LegalLayout title="Contact Developer" icon={<Mail className="w-8 h-8" />}>
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
      <h3 className="text-2xl font-bold text-white mb-4">
        Looking for a Developer?
      </h3>
      <p className="mb-8">
        I built Attendify to showcase my skills in{" "}
        <strong>MERN Stack, Real-time Geofencing, and System Design</strong>. I
        am currently open to new opportunities.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-4">
        <a
          href="https://www.linkedin.com/in/aditya-ghamat-14b558292/"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all"
        >
          Connect on LinkedIn
        </a>
        <a
          href="mailto:adityaghamat01@gmail.com"
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold border border-white/10 transition-all"
        >
          Send Email
        </a>
      </div>
    </div>
  </LegalLayout>
);

export default Contact;
