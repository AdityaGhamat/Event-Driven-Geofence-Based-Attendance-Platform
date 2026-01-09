import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
const InfoRow = ({
  icon,
  label,
  value,
  isTruncated,
}: {
  icon: any;
  label: string;
  value: string;
  isTruncated?: boolean;
}) => (
  <View className="flex-row items-center gap-4 p-4 rounded-2xl bg-[#2b2538]/50 border border-white/5">
    <View className="p-2.5 bg-purple-500/10 rounded-xl">
      <Ionicons name={icon} size={22} color="#d946ef" />
    </View>
    <View className="flex-1">
      <Text className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-0.5">
        {label}
      </Text>
      <Text
        className="text-white text-sm font-semibold"
        numberOfLines={isTruncated ? 1 : undefined}
        ellipsizeMode="tail"
      >
        {value}
      </Text>
    </View>
  </View>
);

export default InfoRow;
