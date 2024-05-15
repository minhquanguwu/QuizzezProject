import axiosInstance from "./axiosInstance";

export const getAllQuizzes = async () => {
    try {
        const response = await axiosInstance.get("/question/all");
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export const getQuestionByCategory = async (category) => {
    try {
        const response = await axiosInstance.get(`/question/category/${category}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export const getAllCategories = async () => {
    try {
        const response = await axiosInstance.get("/question/category");
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};
