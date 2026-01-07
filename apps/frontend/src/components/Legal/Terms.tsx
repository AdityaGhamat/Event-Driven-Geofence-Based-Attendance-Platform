import { FileText } from "lucide-react";
import LegalLayout from "../../layouts/LegalLayout";

 const Terms = () => (
  <LegalLayout title="Terms of Service" icon={<FileText className="w-8 h-8" />}>
    <h3>1. Acceptance of Terms</h3>
    <p>
      By accessing Attendify, you acknowledge that this is a{" "}
      <strong>demonstration platform</strong> provided for educational and
      evaluation purposes only.
    </p>

    <h3>2. Usage Restrictions</h3>
    <p>
      You agree not to use this platform for actual business workforce
      management. The database may be reset periodically, and data persistence
      is not guaranteed.
    </p>

    <h3>3. Open Source License</h3>
    <p>
      The source code for Attendify is available on GitHub. You are free to
      view, fork, and learn from the codebase under the terms of the MIT
      License.
    </p>
  </LegalLayout>
);

export default Terms