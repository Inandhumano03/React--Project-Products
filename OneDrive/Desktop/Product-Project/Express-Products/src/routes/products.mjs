import { Router } from "express"
import { getProductIndexById, getUserIndexById } from "../utils/middlewares.mjs";
import Product from "../mongoose/schema/Product.mjs";
import { checkSchema,validationResult,matchedData } from "express-validator";
import { createProductValidationSchema } from "../utils/validationSchema.js";
const router = Router();





// //all products
// router.get("/api/products", (req, res) => {
//     res.send(products);
// });

// //product by ID
// router.get("/api/products/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     if (isNaN(id)) {
//         res.status(404).send({ msg: "Invalid Request,No product ID found" });
//     }
//     const product = products.find(product => product.id === id);
//     if (!product) {
//         res.status(404).send({ msg: "No product found with given ID" });
//     }
//     else {
//         res.send(product);
//     }
// })




// //search query product params
// router.get("/api/product", (req, res) => {
//     req.session.visited=true;
//     console.log(req.session.id);
//     if (req.query.filter && req.query.value) {
//         return res.send(products.filter((product) => product[req.query.filter].toLowerCase().includes(req.query.value.toLowerCase())));
//     }
//     else {
//         res.send(products);
//     }
// });

// //post product
// router.post("/api/products",
//     checkSchema(createProductValidationSchema)
//     ,(req,res)=>{
//         const result=validationResult(req);
//         console.log(result);
//         console.log(req['express-validator#contexts']);
//         //without u_name validation error should be shown in response and if console.log(req) not given
//         if(!result.isEmpty()){
//             return res.status(400).send({errors:result.array()});
//         }
//     const newProduct={id:products[products.length-1].id+1,...matchedData(req)};
//     products.push(newProduct);//replaced by mongodb code
//     res.status(201).send(newProduct);
// });

// //put request
// router.put("/api/products/:id",getProductIndexById,(req,res)=>{
//       const id = parseInt(req.params.id);
//      const prodIndex=req.prodIndex;
//    products[prodIndex]={id:id,...req.body};
//    return res.status(200).send({msg:"product updated successfully"});
// })


// //patch request
// router.patch("/api/products/:id",getProductIndexById,(req,res)=>{
//     const id = parseInt(req.params.id);
//      const prodIndex=req.prodIndex;
//     products[prodIndex]={...products[prodIndex],...req.body};
//    return res.status(200).send({msg:"product updated successfully"});
// })


// //delete user
// router.delete("/api/products/:id",getProductIndexById,(req,res)=>{
//      const prodIndex=req.prodIndex;
   
//     products.splice(prodIndex, 1);
//    return res.status(200).send({msg:"Product deleted successfully"});
// })
//get all products
router.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


//get products by id

router.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//query params for search
router.get("/api/product", async (req, res) => {
  try {
    const { value } = req.query;

    if (value) {
      const products = await Product.find({
        title: {
          $regex: value,
          $options: "i",
        },
      });

      return res.json(products);
    }

    const products = await Product.find();

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//post products
router.post(
  "/api/products",
  checkSchema(createProductValidationSchema),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        errors: result.array(),
      });
    }

    try {
      const data = matchedData(req);

      const newProduct = await Product.create({
        title: data.title,
        description: data.description,
      });

      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
);

//put products

router.put("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//patch 
router.patch("/api/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//delete product

router.delete("/api/products/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;