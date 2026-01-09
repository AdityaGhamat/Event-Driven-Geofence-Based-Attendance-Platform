import { View, Text, Pressable } from "react-native";
import { toast } from "sonner-native";
import uuid from "react-native-uuid";

export function confirmToast(
  message: string,
  onConfirm: () => void,
  title = "Are you sure?"
) {
  const id = uuid.v4();

  toast.custom(
    <View className="bg-white/90 dark:bg-black/90 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 shadow-lg">
      <Text className="text-base font-semibold text-foreground mb-2">
        {title}
      </Text>
      <Text className="text-sm text-muted-foreground mb-4">{message}</Text>

      <View className="flex-row gap-3 justify-end">
        <Pressable
          onPress={() => toast.dismiss(id)}
          className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700"
        >
          <Text className="text-sm text-muted-foreground font-medium">
            Cancel
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            toast.dismiss(id);
            onConfirm();
          }}
          className="px-4 py-2 bg-destructive rounded-md"
        >
          <Text className="text-sm text-destructive-foreground font-semibold">
            Confirm
          </Text>
        </Pressable>
      </View>
    </View>,
    { duration: Infinity }
  );
}
