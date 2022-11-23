import { Router } from 'express';
import WhatsappBot from '../controllers/WhatsappBot';

const botRouter = Router();

botRouter.post('/incoming', WhatsappBot.giffySearch);

export default botRouter;