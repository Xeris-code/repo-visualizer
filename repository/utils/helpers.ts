export function getFileName(path: string) {
  return path.split("/").pop() ?? path;
}

export function isTestFile(path: string) {
  const fileName = getFileName(path);

  return (
    path.includes("/tests/") ||
    path.includes("/test/") ||
    path.includes("__tests__/") ||
    fileName.includes(".test.") ||
    fileName.includes(".spec.") ||
    fileName.startsWith("test_") ||
    fileName.endsWith("_test.py")
  );
}