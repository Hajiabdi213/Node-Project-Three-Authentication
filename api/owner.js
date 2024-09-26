// Setup Sign up and Login API for Owner

import express from "express";
import prisma from "./lib/index.js";
import bcrypt, { hash } from 'bcrypt'
import  Jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY

const router = express.Router();

// SIGNUP 
router.post('/signup', async (req, res)=>{
    
    
        const {name, email, password} = req.body
try {
     const existingOwner = await prisma.owner.findUnique({where:{
        email:email
     }})

     if(existingOwner)
     {
        return res.status(409).json({
            message:"owner already exists"
        })
     }

     //hash the password
     const hashedPassword = await bcrypt.hash(password, 10);
     console.log(hashedPassword)
     //create owner
     const newOwner = await prisma.owner.create({
        data:{
            name:name,
            email:email,
            password:hashedPassword
        }
     });
     return res.status(201).json({
        message:"Owner Created Successfully",
        owner: newOwner
     })
       

    } catch (error) {
        console.log(error.message)   
    }
})


// Owner Login
// User Login route
router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try {
      //find the user
      const existingOwner = await prisma.owner.findUnique({ where: { email: email } });
      if (!existingOwner) {
        return res.status(404).json({
          message: "Owner was  not found",
        });
      }
      // compare the password
      const isPasswordCorrect = await bcrypt.compare(password, existingOwner.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
  
      // create the token
      const token = Jwt.sign(
        {id: existingOwner.id, email: existingOwner.email},
        SECRET_KEY, 
        {expiresIn: "1hr"}
      )
  
      return res.status(200).json({
        message: "User logged in successfully",
        token: token,
      });
   
    } catch (error) {
     
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  })


export default router;