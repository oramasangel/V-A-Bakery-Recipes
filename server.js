const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ensure data directories exist
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif)'));
    }
  }
});

// Data files
const recipesFile = path.join(dataDir, 'recipes.json');
const inventoryFile = path.join(dataDir, 'inventory.json');

// Initialize data files if they don't exist
if (!fs.existsSync(recipesFile)) {
  fs.writeFileSync(recipesFile, JSON.stringify([]));
}
if (!fs.existsSync(inventoryFile)) {
  fs.writeFileSync(inventoryFile, JSON.stringify([]));
}

// Helper functions to read/write data
function readRecipes() {
  try {
    const data = fs.readFileSync(recipesFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeRecipes(recipes) {
  fs.writeFileSync(recipesFile, JSON.stringify(recipes, null, 2));
}

function readInventory() {
  try {
    const data = fs.readFileSync(inventoryFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeInventory(inventory) {
  fs.writeFileSync(inventoryFile, JSON.stringify(inventory, null, 2));
}

// ===== RECIPE ROUTES =====

// Get all recipes
app.get('/api/recipes', (req, res) => {
  try {
    const recipes = readRecipes();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener recetas' });
  }
});

// Get recipe by ID
app.get('/api/recipes/:id', (req, res) => {
  try {
    const recipes = readRecipes();
    const recipe = recipes.find(r => r.id === req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: 'Receta no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener receta' });
  }
});

// Create new recipe
app.post('/api/recipes', upload.single('image'), (req, res) => {
  try {
    const recipes = readRecipes();
    const newRecipe = {
      id: Date.now().toString(),
      name: req.body.name,
      category: req.body.category,
      ingredients: JSON.parse(req.body.ingredients || '[]'),
      instructions: req.body.instructions,
      servings: req.body.servings,
      prepTime: req.body.prepTime,
      image: req.file ? '/uploads/' + req.file.filename : null,
      createdAt: new Date().toISOString()
    };
    recipes.push(newRecipe);
    writeRecipes(recipes);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear receta: ' + error.message });
  }
});

// Update recipe
app.put('/api/recipes/:id', upload.single('image'), (req, res) => {
  try {
    const recipes = readRecipes();
    const index = recipes.findIndex(r => r.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    
    const updatedRecipe = {
      ...recipes[index],
      name: req.body.name || recipes[index].name,
      category: req.body.category || recipes[index].category,
      ingredients: req.body.ingredients ? JSON.parse(req.body.ingredients) : recipes[index].ingredients,
      instructions: req.body.instructions || recipes[index].instructions,
      servings: req.body.servings || recipes[index].servings,
      prepTime: req.body.prepTime || recipes[index].prepTime,
      image: req.file ? '/uploads/' + req.file.filename : recipes[index].image,
      updatedAt: new Date().toISOString()
    };
    
    recipes[index] = updatedRecipe;
    writeRecipes(recipes);
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar receta: ' + error.message });
  }
});

// Delete recipe
app.delete('/api/recipes/:id', (req, res) => {
  try {
    const recipes = readRecipes();
    const index = recipes.findIndex(r => r.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    
    recipes.splice(index, 1);
    writeRecipes(recipes);
    res.json({ message: 'Receta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar receta' });
  }
});

// ===== INVENTORY ROUTES =====

// Get all inventory items
app.get('/api/inventory', (req, res) => {
  try {
    const inventory = readInventory();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener inventario' });
  }
});

// Get inventory item by ID
app.get('/api/inventory/:id', (req, res) => {
  try {
    const inventory = readInventory();
    const item = inventory.find(i => i.id === req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener item' });
  }
});

// Create new inventory item
app.post('/api/inventory', (req, res) => {
  try {
    const inventory = readInventory();
    const newItem = {
      id: Date.now().toString(),
      name: req.body.name,
      category: req.body.category,
      quantity: parseFloat(req.body.quantity),
      unit: req.body.unit,
      price: parseFloat(req.body.price),
      supplier: req.body.supplier || '',
      notes: req.body.notes || '',
      createdAt: new Date().toISOString()
    };
    inventory.push(newItem);
    writeInventory(inventory);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear item: ' + error.message });
  }
});

// Update inventory item
app.put('/api/inventory/:id', (req, res) => {
  try {
    const inventory = readInventory();
    const index = inventory.findIndex(i => i.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }
    
    const updatedItem = {
      ...inventory[index],
      name: req.body.name || inventory[index].name,
      category: req.body.category || inventory[index].category,
      quantity: req.body.quantity !== undefined ? parseFloat(req.body.quantity) : inventory[index].quantity,
      unit: req.body.unit || inventory[index].unit,
      price: req.body.price !== undefined ? parseFloat(req.body.price) : inventory[index].price,
      supplier: req.body.supplier !== undefined ? req.body.supplier : inventory[index].supplier,
      notes: req.body.notes !== undefined ? req.body.notes : inventory[index].notes,
      updatedAt: new Date().toISOString()
    };
    
    inventory[index] = updatedItem;
    writeInventory(inventory);
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar item: ' + error.message });
  }
});

// Delete inventory item
app.delete('/api/inventory/:id', (req, res) => {
  try {
    const inventory = readInventory();
    const index = inventory.findIndex(i => i.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }
    
    inventory.splice(index, 1);
    writeInventory(inventory);
    res.json({ message: 'Item eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar item' });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Start server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Accede a la aplicación en http://localhost:${PORT}`);
});
