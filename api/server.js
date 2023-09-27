import express, {json} from 'express';
import booksRouter from './books.js'
import bookStore from './bookstores.js'
import ownerRouter from './owner.js'
const server = express();
server.use(json())

// 
server.use('/api/books', booksRouter)
server.use('/api/bookstore', bookStore)
server.use('/api/owner', ownerRouter)

export default server