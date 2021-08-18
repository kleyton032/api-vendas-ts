import { request, Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";

export default class ProductsController {

    public async index(req: Request, res: Response): Promise<Response>{
       const listProducts = new ListProductService();
       
       const products = await listProducts.execute();

       return res.json(products);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const showProduct = new ShowProductService();

        const product = await showProduct.execute({id});

        return res.json(product)
    }

    public async  create (req: Request, res: Response): Promise<Response> {
        const {name, price, quantity} = req.body;

        const createProduct = new CreateProductService();

        const product = await createProduct.execute({
            name,
            price,
            quantity
        })

        return res.json(product);
    }
}