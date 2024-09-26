// Create endpoints for authors, make sure to use the middleware to authenticate the token
import express from "express";
import prisma from "./lib/index.js";
import authenticate from "./middleware/authenticate.js";
const router = express.Router();

// GET ALL AUTHORS  GET: /api/authors
router.get("/",authenticate, async (req, res) => {
  try {
    const authors = await prisma.author.findMany();
    if (!authors) {
      res.status(404).json({ message: "There is no any Author Found." });
    }
    res.status(200).json(authors);
  } catch (error) {
    console.error(error.message);
  }
});

// GET SINGLE AUTHOR   GET: /api/authors/2
router.get("/:id",authenticate, async (req, res) => {
  try {
    const author = await prisma.author.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!author) {
      res
        .status(404)
        .json({ message: `Author with the id ${id} was not found.` });
    }
    res.status(200).json(author);
  } catch (error) {
    console.error(error.message);
  }
});

// ADD AN AUTHOR     POST: /api/authors
router.post("/",authenticate, async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ message: "Please enter Author's name" });
    }
    const author = await prisma.author.create({ data: req.body });
    res.status(201).json(author);
  } catch (error) {
    console.error(error.message);
  }
});

// UPDATING AN AUTHOR    PUT: /api/authors/id
router.put("/:id",authenticate, async (req, res) => {
  try {
    const author = await prisma.author.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    if (!author) {
      res
        .status(404)
        .json({ message: `Author with the Id : ${id} was not found.` });
    }
    res.status(201).json(author);
  } catch (error) {
    console.error(error.message);
  }
});

// DELETING AN AUTHOR     DELETE: /api/authors/id
router.delete("/:id",authenticate, async (req, res) => {
  try {
    const author = await prisma.author.delete({
      where: {
        id: Number(req.params.id),
      }
    });
    
    res.status(200).json(`Author with the ID: ${req.params.id} was deleted successfully`);
  } catch (error) {
    console.error(error.message);
  }
});

export default router;
