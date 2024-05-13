import mongoose, { Schema, SchemaDefinitionProperty, model } from 'mongoose';
const answerSchema = new Schema({
	body: {
		type: String,
		required: true,
	} as SchemaDefinitionProperty,
	image: String,
	isCorrect: Boolean,
});
const questionSchema = new Schema({
	question: {
		type: String,
		require: true,
	} as SchemaDefinitionProperty,
	answerList: [answerSchema] as SchemaDefinitionProperty,
});

const QuestionModel = model('Question', questionSchema);

export default class Question {
	private question: string;
	private answerList: [
		{
			body: string;
			image: string;
			isCorrect: boolean;
		}
	];
	constructor(
		question: string,
		answerList: [
			{
				body: string;
				image: string;
				isCorrect: boolean;
			}
		]
	) {
		this.question = question;
		this.answerList = answerList;
	}

	getQuestion(): string {
		return this.question;
	}

	setQuestion(question: string): void {
		this.question = question;
	}

	getAnswerList(): [
		{
			body: string;
			image: string;
			isCorrect: boolean;
		}
	] {
		return this.answerList;
	}

	setAnswerList(
		answerList: [
			{
				body: string;
				image: string;
				isCorrect: boolean;
			}
		]
	): void {
		this.answerList = answerList;
	}
}
