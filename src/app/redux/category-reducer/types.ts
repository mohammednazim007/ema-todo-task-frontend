export type UCategory = {
  data: { category: string; id: number; limit: number }[];
  isLoading: boolean;
  error: string | null;
};
