import { Router } from "express";

const routes = Router();

routes.get('/', (req, res, next)=>{
    return res.json({message: 'Ok Test!'})
})

export default routes;