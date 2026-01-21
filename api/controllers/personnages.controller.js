import { Activity, Category } from "../models/index.js";

const personnageController = {
    async getAllPersonnage(req,res){
        const activities = await Activity.findAll({where : {category_id: 3}, include : 'category'});
        console.log('activities', activities);
        res.json(activities);
    },
};



export default personnageController;