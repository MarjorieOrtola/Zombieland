import { Activity, Category } from "../models/index.js";

const attractionController = {
    async getAllAttraction(req,res){
        const activities = await Activity.findAll({where : {category_id: 1}, include : 'category'});
        console.log('activities', activities);
        res.json(activities);
    },
};



export default attractionController;


// async getAllAttractions(req,res){
        // const data = await Category.findAll({where: {name: 'attraction'},include: 'activities'});
        // const attractions = data[0].activities;
        // res.status(200).json(attractions);
    // },