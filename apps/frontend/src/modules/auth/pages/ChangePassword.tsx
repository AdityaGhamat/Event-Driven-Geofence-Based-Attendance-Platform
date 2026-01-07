import { useState } from "react";
import { Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { updatePassword } from "../../auth/api";
import { notify } from "../../../components/Toast";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      notify.error("Validation Error", "New passwords do not match.");
      return;
    }

    if (formData.new_password.length < 6) {
      notify.error(
        "Validation Error",
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await updatePassword({
        old_password: formData.old_password,
        new_password: formData.new_password,
      });

      if (res.success) {
        notify.success("Success", "Password updated successfully.");

        setFormData({
          old_password: "",
          new_password: "",
          confirm_password: "",
        });
      } else {
        notify.error(
          "Failed",
          res.errors?.message || "Could not update password"
        );
      }
    } catch (error) {
      notify.error("Error", "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-[#3c354d] border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-[#2a253b] p-6 border-b border-white/5 flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Change Password</h2>
            <p className="text-sm text-white/50">
              Update your account security
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Current Password
            </label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                name="old_password"
                value={formData.old_password}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full bg-[#2a253b] border border-white/10 rounded-xl py-3 pl-5 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              New Password
            </label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full bg-[#2a253b] border border-white/10 rounded-xl py-3 pl-5 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              Confirm New Password
            </label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Confirm new password"
                className={`w-full bg-[#2a253b] border rounded-xl py-3 pl-5 pr-4 text-white placeholder:text-white/20 focus:outline-none transition-all ${
                  formData.confirm_password &&
                  formData.new_password !== formData.confirm_password
                    ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                    : "border-white/10 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50"
                }`}
                required
              />
            </div>

            {formData.confirm_password &&
              formData.new_password !== formData.confirm_password && (
                <div className="flex items-center gap-1 text-xs text-red-400 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-3 h-3" />
                  Passwords do not match
                </div>
              )}
          </div>

          <button
            type="submit"
            disabled={
              loading || formData.new_password !== formData.confirm_password
            }
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-900/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
