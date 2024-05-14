import { Router } from 'express';
import QuestionController from '../controllers/questionController';
const questionRouter = Router();
const questionCon = new QuestionController();
questionRouter.get('/question/all', questionCon.getAllQuestion);
questionRouter.get(
	'/question/category/:category',
	questionCon.getQuestionByCategory
);
questionRouter.post('/question/create', questionCon.createQuestion);
export default questionRouter;
