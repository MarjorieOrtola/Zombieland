import { Activity, Category } from "../models/index.js";

const spectacleController = {
    async getAllSpectacle(req,res){
        const activities = await Activity.findAll({where : {category_id: 2}, include : 'category'});
        console.log('activities', activities);
        res.json(activities);
    },
};



export default spectacleController;