import { Router } from 'express';
import QuestionController from '../controllers/QuestionController';
const questionRouter = Router();
const questionCon = new QuestionController();
questionRouter.get('/question/all', questionCon.getAllQuestion);
questionRouter.get(
	'/question/category/:category',
	questionCon.getQuestionByCategory
);
questionRouter.post('/question/create', questionCon.createQuestion);
questionRouter.post('/question/create/bulk', questionCon.createBulkQuestions);
questionRouter.get('/question/category', questionCon.getAllCategory);
export default questionRouter;
