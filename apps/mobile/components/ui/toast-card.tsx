import { View, Text, Pressable } from "react-native";
import { toast } from "sonner-native";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react-native";
import { TOAST_THEME } from "../../constants/theme";

type ToastType = "success" | "error" | "info";

interface Props {
  id: string | number;
  title: string;
  message?: string;
  type: ToastType;
}

export function ToastCard({ id, title, message, type }: Props) {
  const accent =
    type === "success"
      ? TOAST_THEME.success
      : type === "error"
        ? TOAST_THEME.error
        : TOAST_THEME.info;

  const Icon =
    type === "success" ? CheckCircle : type === "error" ? XCircle : AlertCircle;

  return (
    <View className="rounded-lg p-0 bg-white/90 dark:bg-black/90 border border-neutral-200 dark:border-neutral-800 shadow-lg">
      {/* Accent bar */}
      <View className="h-1 rounded-t-lg" style={{ backgroundColor: accent }} />

      <View className="flex-row items-center p-4 gap-3">
        <Icon size={22} color={accent} />

        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground">
            {title}
          </Text>
          {message && (
            <Text className="text-sm text-muted-foreground mt-0.5">
              {message}
            </Text>
          )}
        </View>

        <Pressable onPress={() => toast.dismiss(id)} className="p-2">
          <X size={18} color="#a1a1aa" />
        </Pressable>
      </View>
    </View>
  );
}
