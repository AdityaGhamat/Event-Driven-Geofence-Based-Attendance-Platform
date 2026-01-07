import { Shield } from "lucide-react";
import LegalLayout from "../../layouts/LegalLayout";

const Privacy = () => (
  <LegalLayout title="Privacy Policy" icon={<Shield className="w-8 h-8" />}>
    <p className="text-lg text-white/80">Last Updated: January 2026</p>

    <h3>1. Introduction</h3>
    <p>
      Welcome to <strong>Attendify</strong>. This application is a{" "}
      <strong>portfolio project</strong> developed by [Your Name] to demonstrate
      full-stack web development skills. It is not intended for commercial use.
    </p>

    <h3>2. Data We Collect</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li>
        <strong>Account Information:</strong> Name, Email, and Password
        (encrypted).
      </li>
      <li>
        <strong>Location Data:</strong> GPS coordinates are collected solely to
        demonstrate the geofencing attendance logic.
      </li>
    </ul>

    <h3>3. Technical Security (For Recruiters)</h3>
    <p>While this is a demo, security best practices have been implemented:</p>
    <ul className="list-disc pl-5 space-y-2">
      <li>
        Passwords are hashed using <strong>Bcrypt</strong>.
      </li>
      <li>
        Authentication is handled via <strong>JWT (JSON Web Tokens)</strong>.
      </li>
      <li>API endpoints are protected with rate limiting to prevent abuse.</li>
    </ul>
  </LegalLayout>
);

export default Privacy;
