import { Activity, Category } from "../models/index.js";

const attractionController = {
    async getAll(req,res){
        const activities = await Activity.findAll({where : {category_id: 'attraction'}, include : 'category'});
        console.log('activities', activities);
        res.json(activities);
    },

    async getAllAttractions(req,res){
        const data = await Category.findAll({where: {name: 'attraction'},include: 'activities'});
        const attractions = data[0].activities;
        res.status(200).json(attractions);
    },
};



export default attractionController;
