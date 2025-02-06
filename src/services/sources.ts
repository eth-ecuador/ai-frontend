export interface URLSourceFormData {
  url: string;
}

export const postSource = async (data: URLSourceFormData) => {
  const trimmedUrl = data.url.trim();
  if (!trimmedUrl) throw new Error("Please enter a valid URL");

  try {
    new URL(trimmedUrl);
  } catch {
    throw new Error("Please enter a valid URL");
  }

  /*
  const response = await fetch("/api/upload-source", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "url", content: trimmedUrl }),
  });

  if (!response.ok) throw new Error("Failed to upload source");
  */
  console.log(trimmedUrl);
  return { message: "Source added successfully!", ok: true };
};
