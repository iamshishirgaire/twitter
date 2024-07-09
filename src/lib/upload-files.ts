import api from "@/lib/api";

interface SignedUrlResponse {
  uploadUrl: string;
  timestamp: number;
  signature: string;
  api_key: string;
  cloud_name: string;
}

const getSignedUrl = async (
  type: "video" | "image",
): Promise<SignedUrlResponse> => {
  try {
    const response = await api.get<SignedUrlResponse>(`/upload?type=${type}`);
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
    const signedUrlDataVideo = await getSignedUrl("video");
    const signedUrlDataImage = await getSignedUrl("image");

    const videoFiles = files.filter((file) => file.type.includes("video"));
    const imageFiles = files.filter((file) => file.type.includes("image"));

    const uploadPromisesVideo = videoFiles.map((file) =>
      uploadFile(file, signedUrlDataVideo),
    );
    const uploadPromisesImage = imageFiles.map((file) =>
      uploadFile(file, signedUrlDataImage),
    );

    const uploadedUrlsVideo = await Promise.all(uploadPromisesVideo);
    const uploadedUrlsImage = await Promise.all(uploadPromisesImage);

    const uploadedUrls = [...uploadedUrlsVideo, ...uploadedUrlsImage];
    return uploadedUrls;
  } catch (error) {
    console.error(error);

    throw new Error(`Failed to upload files: ${error}`);
  }
};
