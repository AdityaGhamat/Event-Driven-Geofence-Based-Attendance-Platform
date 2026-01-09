import {
  View,
  FlatList,
  ActivityIndicator,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { getOffices } from "@/api/office";
import OfficeCard from "./office-card";
import RenderEmptyState from "./render-empty-state";
interface SearchResultsProps {
  search: string;
}

const SearchResults = ({ search }: SearchResultsProps) => {
  const [offices, setOffices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!search) {
      setOffices([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await getOffices(search);
        if (res?.success) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOffices(res.data.offices);
        } else if (Array.isArray(res?.data)) {
          setOffices(res.data);
        }
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <View className="flex-1 w-full px-4 mt-4">
      {loading ? (
        <View className="mt-10">
          <ActivityIndicator size="large" color="#d946ef" />
        </View>
      ) : (
        <FlatList
          data={offices}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="mb-4">
              <OfficeCard {...item} />
            </View>
          )}
          ListEmptyComponent={RenderEmptyState}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default SearchResults;
