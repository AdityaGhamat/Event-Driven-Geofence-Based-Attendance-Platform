import toast, { type Toast } from "react-hot-toast";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  HelpCircle,
} from "lucide-react";

const THEME = {
  bg: "bg-[#3c354d]",
  border: "border-white/10",
  shadow: "shadow-[0_8px_30px_rgba(0,0,0,0.5)]",
  textHeader: "text-white",
  textBody: "text-neutral-400",
  success: "text-emerald-400",
  error: "text-red-400",
  info: "text-purple-400",
};

// ... [Keep ToastCard exactly as it was] ...
const ToastCard = ({
  t,
  title,
  message,
  type,
}: {
  t: Toast;
  title: string;
  message?: string;
  type: "success" | "error" | "info";
}) => {
  return (
    <div
      className={`
        ${t.visible ? "animate-enter" : "animate-leave"}
        max-w-md w-full 
        ${THEME.bg} 
        border ${THEME.border} 
        ${THEME.shadow}
        pointer-events-auto 
        flex ring-1 ring-black ring-opacity-5 
        rounded-xl overflow-hidden
        relative
        backdrop-blur-xl
      `}
    >
      <div
        className={`w-1.5 absolute left-0 top-0 bottom-0
          ${type === "success" ? "bg-emerald-500" : ""}
          ${type === "error" ? "bg-red-500" : ""}
          ${type === "info" ? "bg-purple-500" : ""}
        `}
      />

      <div className="flex-1 w-0 p-4 pl-6">
        <div className="flex items-start">
          <div className="shrink-0 pt-0.5">
            {type === "success" && (
              <CheckCircle2 className={`h-6 w-6 ${THEME.success}`} />
            )}
            {type === "error" && (
              <XCircle className={`h-6 w-6 ${THEME.error}`} />
            )}
            {type === "info" && (
              <AlertCircle className={`h-6 w-6 ${THEME.info}`} />
            )}
          </div>

          <div className="ml-4 flex-1">
            <p className={`text-sm font-semibold ${THEME.textHeader}`}>
              {title}
            </p>
            {message && (
              <p className={`mt-1 text-sm ${THEME.textBody}`}>{message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex border-l border-white/10">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-neutral-400 hover:text-white focus:outline-none transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

interface ConfirmOptions {
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "standard";
  title?: string;
}

const ConfirmToast = ({
  t,
  message,
  onConfirm,
  options = {},
}: {
  t: Toast;
  message: string;
  onConfirm: () => void;
  options?: ConfirmOptions;
}) => {
  const {
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "standard",
    title = "Are you sure?",
  } = options;

  const isDanger = variant === "danger";

  return (
    <div
      className={`
        ${t.visible ? "animate-enter" : "animate-leave"}
        max-w-md w-full bg-[#3c354d] border border-white/10 shadow-2xl
        rounded-xl overflow-hidden pointer-events-auto flex flex-col
        ring-1 ring-black ring-opacity-5 backdrop-blur-xl p-4
      `}
    >
      <div className="flex items-start">
        <div className="shrink-0 pt-0.5">
          {isDanger ? (
            <AlertCircle className="h-10 w-10 text-red-500" />
          ) : (
            <HelpCircle className="h-10 w-10 text-purple-400" />
          )}
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-bold text-white">{title}</p>
          <p className="mt-1 text-sm text-neutral-400">{message}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-3 justify-end">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-3 py-1.5 text-sm text-neutral-400 hover:text-white transition-colors"
        >
          {cancelText}
        </button>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
          }}
          className={`
            px-4 py-1.5 text-sm font-semibold rounded-lg shadow-lg transition-all text-white
            ${
              isDanger
                ? "bg-red-500 hover:bg-red-600 shadow-red-500/20"
                : "bg-purple-600 hover:bg-purple-500 shadow-purple-500/20"
            }
          `}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export const notify = {
  success: (title: string, message?: string) =>
    toast.custom(
      (t) => <ToastCard t={t} title={title} message={message} type="success" />,
      { duration: 4000 }
    ),

  error: (title: string, message?: string) =>
    toast.custom(
      (t) => <ToastCard t={t} title={title} message={message} type="error" />,
      { duration: 5000 }
    ),

  info: (title: string, message?: string) =>
    toast.custom(
      (t) => <ToastCard t={t} title={title} message={message} type="info" />,
      { duration: 4000 }
    ),

  confirm: (message: string, onConfirm: () => void, options?: ConfirmOptions) =>
    toast.custom(
      (t) => (
        <ConfirmToast
          t={t}
          message={message}
          onConfirm={onConfirm}
          options={options}
        />
      ),
      {
        duration: Infinity,
      }
    ),
};
