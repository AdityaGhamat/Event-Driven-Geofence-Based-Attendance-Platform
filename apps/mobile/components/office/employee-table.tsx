import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import EmployeeList from "./employee-list";
import { IEmployeeTableProps } from "@/types/office";
import { getWorkers } from "@/api/office";

const EmployeeTable = () => {
  const [employee, setEmployee] = useState<IEmployeeTableProps[]>([]);
  const [error, setError] = useState<Record<any, any>>();
  useEffect(() => {
    async function fetchWorkers() {
      const res = await getWorkers();
      if (res.success) {
        setEmployee(res.data);
      } else {
        setError(res.errors.message);
      }
    }
    fetchWorkers();
  }, []);
  return (
    <View>
      <EmployeeList employees={employee} />
    </View>
  );
};

export default EmployeeTable;
