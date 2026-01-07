export interface ApiResponse<T> {
  success: boolean;
  active: boolean;
  data: T;
  message: string;
  errors: Record<string, any>;
}

export interface FeatureSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageSrc: string;
  align: "left" | "right";
}
