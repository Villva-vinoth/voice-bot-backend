const CustomError = require("./customError");
const { InferenceClient } = require("@huggingface/inference");
const client = new InferenceClient(process.env.HUGGING_FACE_TOKEN);
const getAIResponse = async (userQuery) => {
    try {
        const chatCompletion = await client.chatCompletion({
            provider: process.env.MODEL_PROVIDER,
            model: process.env.MODEL,
            messages: [
                {
                    role: "user",
                    content: userQuery,
                },
            ],
        });
        return chatCompletion.choices[0].message.content;
    } catch (error) {
        throw new CustomError(error.message);
    }
};

module.exports = { getAIResponse };











