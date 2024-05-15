import { Request, Response } from 'express';
import QuestionRepository from '../repository/QuestionRepository';
import Question from '../models/Question';
export default class QuestionController {
	public constructor() {}

	public getAllQuestion = async (req: Request, res: Response) => {
		const { ok, data } = await new QuestionRepository().getQuestionData();
		if (!ok) {
			return res.status(400).json({
				code: 400,
				data: null,
			});
		}
		return res.status(200).json({
			code: 200,
			data,
		});
	};
	public getQuestionByCategory = async (req: Request, res: Response) => {
		const { category } = req.params;

		const { ok, data } = await new QuestionRepository().getQuestionByCategory(
			String(category)
		);
		if (!ok)
			return res.status(400).json({
				code: 400,
				data: null,
			});
		return res.status(200).json({
			code: 200,
			data,
		});
	};
	public createQuestion = async (req: Request, res: Response) => {
		const question = await req.body;

		const newQuestion = new Question(
			question.category,
			question.question,
			question.answerList
		);

		const { ok, data } = await new QuestionRepository().createQuestion(
			newQuestion
		);
		if (!ok)
			return res.status(400).json({
				code: 400,
				data: null,
			});
		return res.status(200).json({
			code: 200,
			data,
		});
	};
	public createBulkQuestions = async (req: Request, res: Response) => {
		let questions = await req.body;
		questions.forEach((question) => {
			return new Question(
				question.category,
				question.question,
				question.answerList
			);
		});
		const { ok, data } = await new QuestionRepository().createBulkQuestions(
			questions
		);
		if (!ok)
			return res.status(400).json({
				data: null,
				code: 400,
			});
		return res.status(200).json({
			data,
			code: 200,
		});
	};
	public getAllCategory = async (req: Request, res: Response) => {
		const { ok, data } = await new QuestionRepository().getAllCategories();
		if (!ok)
			return res.status(400).json({
				code: 400,
				data: null,
			});
		return res.status(200).json({
			code: 200,
			data,
		});
	};
}
