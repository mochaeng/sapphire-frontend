function ErrorField({
  hasError,
  error: error,
}: {
  hasError: boolean;
  error: string;
}) {
  if (hasError) {
    return <p className="text-sm text-red-500">{error}</p>;
  }
  return null;
}

export default ErrorField;
