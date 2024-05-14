import Question, { QuestionModel } from '../models/Question';

export default class QuestionRepository {
	public constructor() {}
	public getQuestionData = async () => {
		try {
			const query = await QuestionModel.find();
			return {
				data: query,
				ok: true,
			};
		} catch (error) {
			console.log('Error fetching all question data', error.msg);
			return {
				data: null,
				ok: false,
			};
		}
	};
	public getQuestionByCategory = async (category: string) => {
		try {
			const query = await QuestionModel.find({
				category: category,
			});
			return {
				ok: true,
				data: query,
			};
		} catch (error) {
			console.log('Error fetching question by category', error.msg);
			return { ok: false, data: null };
		}
	};
	public createQuestion = async (newQuestion: Question) => {
		try {
			const question = newQuestion.getQuestion();
			const answerList = newQuestion.getAnswerList();
			const category = newQuestion.getCategory();
			const query = await QuestionModel.create({
				category: category,
				question: question,
				answerList: answerList,
			});
			return {
				ok: true,
				data: query,
			};
			return;
		} catch (error) {
			console.log('Error creating new question', error.message);
			return {
				ok: false,
				data: null,
			};
		}
	};
	public createBulkQuestions = async (questions: Question[]) => {
		try {
			console.log('Questions: ', questions);
			// questions.forEach((newQuestion: Question) => {
			// 	const category = newQuestion.getCategory();
			// 	const question = newQuestion.getQuestion();
			// 	const answerList = newQuestion.getAnswerList();
			// 	return {
			// 		category,
			// 		question,
			// 		answerList,
			// 	};
			// });
			const query = await QuestionModel.insertMany(questions);
			return { ok: true, data: query };
		} catch (error) {
			console.log('Error bulk inserting questions: ', error.message);
			return { ok: false, data: null };
		}
	};
}
