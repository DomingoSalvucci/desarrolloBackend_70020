import { Router} from "express";
import cartManage from "../managers/cartManage.js";
import productManage from "../managers/productManage.js"

const router = Router();

router.post("/carts", async (req,res) => {
  try {
    const body = req.body;
    const cart = await cartManage.createCart(body);

    res.status(201).json({status: "ok", cart});
  
  } catch (error) {
    console.log(error);
    res.status(500).json({status:"error", msg: "Error interno del servidor"});
  }
})


router.get("/carts/:cid", async (req,res) => {
  try {
    const {cid} = req.params;
    const cart = await cartManage.getCartById(cid);

    if (!cart) return res.status(404).json({status:"error", msg:"Carrito no encontrado"});

    res.status(201).json({status: "ok", cart});
  
  } catch (error) {
    console.log(error);
    res.status(500).json({status:"error", msg: "Error interno del servidor"});
  }
})

router.post("/carts/:cid/product/:pid", async (req,res) => {
  try {
    const {cid, pid} = req.params;
    
    const cartExist = await cartManage.getCartById(cid);
    if (!cartExist) return res.status(404).json({status:"error", msg:"Carrito no encontrado"});

    const ProductExist = await productManage.getProductById(pid);
    if (!ProductExist) return res.status(404).json({status:"error", msg:"Producto no encontrado"});

    const cart = await cartManage.addProductToCart(cid, pid);
    // if (!cart) return res.status(404).json({status:"error", msg:"Carrito no encontrado"});
    res.status(201).json({status: "ok", cart});
  
  } catch (error) {
    console.log(error);
    res.status(500).json({status:"error", msg: "Error interno del servidor"});
  }
})







export default router;
