export const convertSpeechToTextResponse = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, `recording_${Date.now()}.wav`);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_API}/speech/conversation/`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();
        console.log("Response Data:", data);

        if (response.ok) {
            return { success: true, response: data.response };
        } else {
            console.error("Error uploading file:", data.response);
            return { success: false, error: data.response };
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        return { success: false, error };
    }
};