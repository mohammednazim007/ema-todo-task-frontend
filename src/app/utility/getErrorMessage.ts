export const getErrorMessage = (error: any): string => {
  // Handle errors from your API
  if (error?.data?.message) return error.data.message;

  // Handle client-side errors
  if (error?.message) return error.message;

  // Handle other potential error structures
  return "";
};
