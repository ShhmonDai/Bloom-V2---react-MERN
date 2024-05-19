import { errorHandler } from '../utils/error.js';
import Goal from '../models/goal.model.js';
import Subgoal from '../models/subgoal.model.js';


export const getcategoryscore = async (req, res, next) => {
    try {

        const totalSubgoals = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: req.query.category,
        });
        const totalGoals = await Goal.countDocuments({ 
            userId: req.params.userId,
            category: req.query.category, 
        });

        const subgoalScore = await Subgoal.countDocuments({
            userId: req.params.userId,
            category: req.query.category,
            accomplished: true,
        });

        const goalScore = await Goal.countDocuments({
            userId: req.params.userId,
            category: req.query.category,
            accomplished: true,
        });

        res.status(200).json({ totalGoals, totalSubgoals, subgoalScore, goalScore });
    } catch (error) {
        next(error);
    }
};