import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import EmployeeList from "./employee-list";
import { IEmployeeTableProps } from "@/types/office";
import { getWorkers } from "@/api/office";
import { useAuth } from "@/hooks/useAuth";

const EmployeeTable = () => {
  const { user, loading: authLoading } = useAuth();
  const [employee, setEmployee] = useState<IEmployeeTableProps[]>([]);
  const [error, setError] = useState<Record<any, any>>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user || authLoading) {
      return;
    }
    async function fetchWorkers() {
      setLoading(true);
      try {
        const res = await getWorkers();
        if (res.success) {
          setEmployee(res.data);
        } else {
          setError(res.errors.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkers();
  }, [user, authLoading]);
  if (authLoading || loading) {
    return (
      <View className="mt-8 p-4 justify-center items-center">
        <ActivityIndicator color="#d946ef" />
      </View>
    );
  }
  return (
    <View>
      <EmployeeList employees={employee} />
    </View>
  );
};

export default EmployeeTable;
