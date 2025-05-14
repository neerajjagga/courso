import User from "../models/user.model.js";
import Lecture from "../models/lecture.model.js";

declare global {
    namespace Express {
        interface Request {
            user?: User,
            lecture?: Lecture
        }
    }
}