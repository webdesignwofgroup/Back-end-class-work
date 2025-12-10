import { Product } from "../Model/productmodel.js"

// Create Product 
export const createProduct = async(req, res) =>{
    try { 
        const {name, price, description, image, category} =
        req.body
    const newProduct = await Product.create({
        name,
        price,
        description,
        image,
        category
        
    }) 
    res.status(201).json({
        success:true,
        message:" Product Created Successfully",
        Product:newProduct
    })

  } 
  catch (error) {
        console.error(error)
    res.status(500).json({ success:false, message:"Server Error", error})
}
}

    // GET ALL Products
export const getAllproducts = async(req, res) => {
    try { 
        let product = await Product.find()
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:"server Error",
        error})
    }
}

// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
}


// Product Update 
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, description, image, category } = req.body;

        // Find product
        let product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update Only Provided Fields
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.category = category || product.category;

        // Save changes
        await product.save();

        res.status(200).json({
            success: true,
            message: "Product Successfully Updated",
            product: {
                id: product._id,
                name: product.name,
                price: product.price,
                description: product.description,
                image: product.image,
                category: product.category
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete product by ID


export const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        // Find and delete the product
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product does not exist" });
        }

        res.status(200).json({ message: "Product deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

