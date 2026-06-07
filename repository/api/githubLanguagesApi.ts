export async function fetchRepositoryLanguages(
  owner: string,
  repo: string
) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/languages`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repository languages");
  }

  return response.json();
}