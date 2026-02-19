export const handleCatchBlockReturn = (
  error: unknown,
  defaultMessage: string,
) => {
  return {
    success: false,
    message: error instanceof Error ? error.message : defaultMessage,
  };
};
