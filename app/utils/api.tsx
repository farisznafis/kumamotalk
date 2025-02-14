export const convertSpeechToTextResponse = async (audioBlob: Blob, language: string | null) => {
    const formData = new FormData();
    formData.append("file", audioBlob, `recording_${Date.now()}.wav`);
    
    // Append the language to the FormData, it can be null or undefined if not provided
    if (language) {
        formData.append("language", language);
    }

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
            return { success: true, data: data.data };
        } else {
            return { success: false, error: data };
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        return { success: false, error };
    }
};