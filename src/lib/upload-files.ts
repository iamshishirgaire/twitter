import api from "@/lib/api";

interface SignedUrlResponse {
  uploadUrl: string;
  timestamp: number;
  signature: string;
  api_key: string;
  cloud_name: string;
}

const getSignedUrl = async (): Promise<SignedUrlResponse> => {
  try {
    const response = await api.get<SignedUrlResponse>("/upload");
    return response.data;
  } catch (error) {
    throw new Error(`Failed to get signed URL: ${error}`);
  }
};

const uploadFile = async (
  file: File,
  signedUrlData: SignedUrlResponse,
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("timestamp", signedUrlData.timestamp.toString());
  formData.append("signature", signedUrlData.signature);
  formData.append("api_key", signedUrlData.api_key);

  try {
    const response = await fetch(signedUrlData.uploadUrl, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.url; // Assuming the response contains the URL in `url`
  } catch (error) {
    throw new Error(`Failed to upload file: ${error}`);
  }
};

export const uploadFiles = async (files: File[]): Promise<string[]> => {
  try {
    const signedUrlData = await getSignedUrl();
    const uploadPromises = files.map((file) => uploadFile(file, signedUrlData));
    const uploadedUrls = await Promise.all(uploadPromises);
    return uploadedUrls;
  } catch (error) {
    throw new Error(`Failed to upload files: ${error}`);
  }
};
