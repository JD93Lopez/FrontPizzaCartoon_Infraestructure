import express, { Application } from "express";
import cors from "cors";
import path from "path";
import ClientView from "../client/view/ClientView";
import ProductsView from "../products/view/ProductsView";

export default class ExpressServer {
    private readonly app: Application;

    constructor(
        private readonly clientView: ClientView,
        private readonly moviesView: ProductsView
    ) {
        this.app = express()
        this.config()
        this.statics()
        this.routes()
    }

    public config(){
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) );
        this.app.use(cors())
    }

    public statics = () => {
        this.app.use(
            express.static(
                path.resolve( __dirname, '../client/public' )
            )
        )
    }

    public routes() {
        this.app.use('/api/v1.0/store', cors() ,this.moviesView.router)
        this.app.use('/', cors() ,this.clientView.router)
    }

    public start() {
        const PORT = process.env["PORT"] || 80;
        const HOST = process.env["HOST"] || 'localhost';
        this.app.listen( PORT, () => {
            console.log(`Server running on http://${HOST}:${PORT}`);
        })
    }
}