import { StyleSheet, Text, View } from "react-native";
import React, { useActionState } from "react";
import OfficeHeader from "./office-header";
import { useAuth } from "@/hooks/useAuth";
import SandT from "./sandt";
import OfficeMap from "./office-map";
import EmployeeTable from "./employee-table";

const OfficeScreen = () => {
  return (
    <View>
      <OfficeHeader />
      <SandT />
      <OfficeMap />
      <EmployeeTable />
    </View>
  );
};

export default OfficeScreen;
