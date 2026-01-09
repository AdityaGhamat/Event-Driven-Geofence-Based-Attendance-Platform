import { toast } from "sonner-native";
import { ToastCard } from "./toast-card";
import uuid from "react-native-uuid";

export const notify = {
  success: (title: string, message?: string) => {
    const id = uuid.v4();
    return toast.custom(
      <ToastCard id={id} title={title} message={message} type="success" />
    );
  },

  error: (title: string, message?: string) => {
    const id = uuid.v4();
    return toast.custom(
      <ToastCard id={id} title={title} message={message} type="error" />
    );
  },

  info: (title: string, message?: string) => {
    const id = uuid.v4();
    return toast.custom(
      <ToastCard id={id} title={title} message={message} type="info" />
    );
  },
};
