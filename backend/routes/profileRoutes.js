import { getUser } from "../controllers/profileController.js";

const profileRouter = express.Router();

profileRouter.get('/user/:userId', getUser);

export default profileRouter;
