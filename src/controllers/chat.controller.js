const { chatSchema } = require("../helper/chat.validation");
const CustomError = require("../utils/customError");
const chatModel = require("../models/Chat.model");
const { getAIResponse } = require("../utils/huggingFaceAi");

module.exports = {
    createChat: async (req, res, next) => {
        try {
            const {query, userId} = req.body;
            const { error } = chatSchema.validate({query, userId});
            if (error) {
                throw new CustomError(error.details[0].message, 400);
            }
            const AiResponse = await getAIResponse(query);
            const chat = await chatModel.create({
                userId,
                query,
                response :AiResponse
            });
            res.status(201).json({ 
                success: true, 
                data: chat 
            });
        } catch (error) {
            next(error);
        }
    },
    getChatByUserId: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const chat = await chatModel.find({ userId }).sort({ createdAt: 1 }).select({ __v: 0 , userId: 0, updatedAt: 0}) || [];
            res.status(200).json({ data: chat, success: true });
        } catch (error) {
            next(error);
        }
    },

};      