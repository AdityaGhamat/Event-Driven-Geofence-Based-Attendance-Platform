import { Pressable, Text, View } from "react-native";
import React from "react";
import type { EmployeeListProps, IEmployeeTableProps } from "@/types/office";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";

const EmployeeList = ({ employees }: EmployeeListProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const onAttendanceProfile = (employee: IEmployeeTableProps) => {
    const isCurrentUser = String(employee?._id) === String(user?._id);
    if (isCurrentUser) {
      router.push("/(dashboard)/profile");
    }
  };

  return (
    <View className="flex-1 mt-6 border border-purple-500/30 rounded-xl bg-[#3c354d] overflow-hidden shadow-2xl">
      <View className="flex-row px-4 py-3 bg-[#2a253b] border-b border-white/5">
        <Text className="flex-1 text-xs font-semibold text-white/50 uppercase tracking-wider">
          Employee
        </Text>
        <Text className="text-xs font-semibold text-white/50 uppercase tracking-wider">
          Status
        </Text>
      </View>
      {employees.map((employee) => {
        const isCurrentUser = String(employee._id) === String(user?._id);

        return (
          <Pressable
            key={employee._id}
            onPress={() => onAttendanceProfile(employee)}
            disabled={!isCurrentUser}
            className={`
              flex-row items-center justify-between p-4 border-b border-white/5
              active:bg-white/5 
              ${isCurrentUser ? "bg-purple-500/10 border-l-4 border-l-fuchsia-500" : ""}
            `}
          >
            <View className="flex-1 flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-purple-600 items-center justify-center border border-white/10">
                <Text className="text-white font-bold text-sm">
                  {employee.name.charAt(0).toUpperCase()}
                </Text>
              </View>

              <View>
                <Text className="text-white font-medium text-sm">
                  {employee.name}{" "}
                  {isCurrentUser && (
                    <Text className="text-fuchsia-400 text-xs">(You)</Text>
                  )}
                </Text>

                <Text className="text-white/40 text-xs capitalize mt-0.5">
                  {employee.role.replace("_", " ")}
                </Text>
              </View>
            </View>

            <View className="items-end">
              <View
                className={`flex-row items-center gap-1.5 px-2 py-1 rounded-full border ${
                  employee.isActive
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-red-500/10 border-red-500/20"
                }`}
              >
                <View
                  className={`w-1.5 h-1.5 rounded-full ${
                    employee.isActive ? "bg-emerald-400" : "bg-red-400"
                  }`}
                />
                <Text
                  className={`text-[10px] font-medium ${
                    employee.isActive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {employee.isActive ? "Active" : "Inactive"}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}

      {employees.length === 0 && (
        <View className="p-8 items-center justify-center">
          <Text className="text-white/40 italic">No employees found.</Text>
        </View>
      )}
    </View>
  );
};

export default EmployeeList;
