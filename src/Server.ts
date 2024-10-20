import Client from './client/Client'
import ExpressServer from './express/ExpressServer'
import Products from './products/Products'

const clientView = Client.createView()
const productsView = Products.createView()

const server = new ExpressServer(clientView, productsView)
server.start()
