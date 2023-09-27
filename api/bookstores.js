import express from "express";
import prisma from "./lib/index.js";
import authenticate from "./middleware/authenticate.js";
const router = express.Router();

// GET ALL   GET: /api/authors
router.get("/",authenticate, async (req, res) => {
  try {
    const bookstores = await prisma.bookStore.findMany();
    if (!bookstores) {
      res.status(404).json({ message: "There is no any bookstore Found." });
    }
    res.status(200).json(bookstores);
  } catch (error) {
    console.error(error.message);
  }
});

// GET SINGLE    GET: /api/bookstores/2
router.get("/:id",authenticate, async (req, res) => {
  try {
    const bookstore = await prisma.bookStore.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!bookstore) {
      res
        .status(404)
        .json({ message: `bookstore with the id ${id} was not found.` });
    }
    res.status(200).json(bookstore);
  } catch (error) {
    console.error(error.message);
  }
});

// ADD      POST: /api/bookstores
router.post("/", authenticate, async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ message: "Please enter bookstore's name" });
    }
    const bookstore = await prisma.bookStore.create({ data: req.body });
    res.status(201).json(bookstore);
  } catch (error) {
    console.error(error.message);
  }
});

// UPDATING A BOOKSTORE    PUT: /api/bookstores/id
router.put("/:id", authenticate , async (req, res) => {
  try {
    const bookstore = await prisma.bookStore.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    if (!bookstore) {
      res
        .status(404)
        .json({ message: `bookstore with the Id : ${id} was not found.` });
    }
    res.status(201).json(bookstore);
  } catch (error) {
    console.error(error.message);
  }
});

// DELETING A BOOKSTORE     DELETE: /api/bookstores/id
router.delete("/:id", authenticate , async (req, res) => {
  try {
    const bookstore = await prisma.bookStore.delete({
      where: {
        id: Number(req.params.id),
      }
    });
    
    res.status(200).json(`bookstore with the ID: ${req.params.id} was deleted successfully`);
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
