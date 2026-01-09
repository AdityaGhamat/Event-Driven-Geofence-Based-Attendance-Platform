import { StyleSheet, Text, View } from "react-native";
import React, { useActionState, useState } from "react";
import OfficeHeader from "./office-header";
import { useAuth } from "@/hooks/useAuth";
import SandT from "./sandt";
import OfficeMap from "./office-map";
import EmployeeTable from "./employee-table";
import { IEmployeeTableProps } from "@/types/office";

const OfficeScreen = () => {
  // const [employee, setEmployee] = useState<IEmployeeTableProps[]>([]);
  // const [error, setError] = useState<Record<any, any>>();

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
