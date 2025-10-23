// API Base URL
const API_URL = window.location.origin;

// Global state
let recipes = [];
let inventory = [];
let currentRecipe = null;
let currentInventoryItem = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initModals();
    loadRecipes();
    loadInventory();
    initFilters();
});

// ===== NAVIGATION =====
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            switchSection(section);
        });
    });
}

function switchSection(section) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === section) {
            btn.classList.add('active');
        }
    });

    // Update sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(`${section}-section`).classList.add('active');
}

// ===== MODALS =====
function initModals() {
    // Recipe modal
    const recipeModal = document.getElementById('recipe-modal');
    const addRecipeBtn = document.getElementById('add-recipe-btn');
    const cancelRecipeBtn = document.getElementById('cancel-recipe-btn');
    const recipeForm = document.getElementById('recipe-form');

    addRecipeBtn.addEventListener('click', () => openRecipeModal());
    cancelRecipeBtn.addEventListener('click', () => closeModal(recipeModal));
    recipeForm.addEventListener('submit', handleRecipeSubmit);

    // Inventory modal
    const inventoryModal = document.getElementById('inventory-modal');
    const addInventoryBtn = document.getElementById('add-inventory-btn');
    const cancelInventoryBtn = document.getElementById('cancel-inventory-btn');
    const inventoryForm = document.getElementById('inventory-form');

    addInventoryBtn.addEventListener('click', () => openInventoryModal());
    cancelInventoryBtn.addEventListener('click', () => closeModal(inventoryModal));
    inventoryForm.addEventListener('submit', handleInventorySubmit);

    // Recipe detail modal
    const recipeDetailModal = document.getElementById('recipe-detail-modal');

    // Close modals when clicking on close button or outside
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal);
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Image preview
    const recipeImageInput = document.getElementById('recipe-image');
    recipeImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const preview = document.getElementById('recipe-image-preview');
                preview.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
}

function openRecipeModal(recipe = null) {
    const modal = document.getElementById('recipe-modal');
    const form = document.getElementById('recipe-form');
    const title = document.getElementById('recipe-modal-title');
    
    form.reset();
    document.getElementById('recipe-image-preview').style.display = 'none';
    
    if (recipe) {
        currentRecipe = recipe;
        title.textContent = 'Editar Receta';
        document.getElementById('recipe-id').value = recipe.id;
        document.getElementById('recipe-name').value = recipe.name;
        document.getElementById('recipe-category').value = recipe.category;
        document.getElementById('recipe-servings').value = recipe.servings || '';
        document.getElementById('recipe-prep-time').value = recipe.prepTime || '';
        document.getElementById('recipe-ingredients').value = recipe.ingredients.join('\n');
        document.getElementById('recipe-instructions').value = recipe.instructions;
        
        if (recipe.image) {
            const preview = document.getElementById('recipe-image-preview');
            preview.src = recipe.image;
            preview.style.display = 'block';
        }
    } else {
        currentRecipe = null;
        title.textContent = 'Nueva Receta';
    }
    
    modal.style.display = 'block';
}

function openInventoryModal(item = null) {
    const modal = document.getElementById('inventory-modal');
    const form = document.getElementById('inventory-form');
    const title = document.getElementById('inventory-modal-title');
    
    form.reset();
    
    if (item) {
        currentInventoryItem = item;
        title.textContent = 'Editar Item';
        document.getElementById('inventory-id').value = item.id;
        document.getElementById('inventory-name').value = item.name;
        document.getElementById('inventory-category').value = item.category;
        document.getElementById('inventory-quantity').value = item.quantity;
        document.getElementById('inventory-unit').value = item.unit;
        document.getElementById('inventory-price').value = item.price;
        document.getElementById('inventory-supplier').value = item.supplier || '';
        document.getElementById('inventory-notes').value = item.notes || '';
    } else {
        currentInventoryItem = null;
        title.textContent = 'Nuevo Item de Inventario';
    }
    
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

// ===== RECIPES =====
async function loadRecipes() {
    try {
        const response = await fetch(`${API_URL}/api/recipes`);
        recipes = await response.json();
        displayRecipes();
    } catch (error) {
        console.error('Error al cargar recetas:', error);
        showError('Error al cargar las recetas');
    }
}

function displayRecipes(filteredRecipes = null) {
    const grid = document.getElementById('recipes-grid');
    const recipesToDisplay = filteredRecipes || recipes;
    
    if (recipesToDisplay.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <h3>No hay recetas disponibles</h3>
                <p>Agrega tu primera receta para comenzar</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = recipesToDisplay.map(recipe => `
        <div class="recipe-card" onclick="viewRecipeDetail('${recipe.id}')">
            <div class="recipe-image">
                ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}">` : '🍰'}
            </div>
            <div class="recipe-content">
                <h3>${recipe.name}</h3>
                <span class="recipe-category">${getCategoryLabel(recipe.category)}</span>
                <div class="recipe-meta">
                    ${recipe.servings ? `<span>🍽️ ${recipe.servings} porciones</span>` : ''}
                    ${recipe.prepTime ? `<span>⏱️ ${recipe.prepTime} min</span>` : ''}
                </div>
                <div class="recipe-actions" onclick="event.stopPropagation()">
                    <button class="btn btn-success btn-small" onclick="editRecipe('${recipe.id}')">✏️ Editar</button>
                    <button class="btn btn-danger btn-small" onclick="deleteRecipe('${recipe.id}')">🗑️ Eliminar</button>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryLabel(category) {
    const labels = {
        'panaderia': 'Panadería',
        'postres': 'Postres',
        'comida': 'Comida',
        'bebidas': 'Bebidas',
        'otros': 'Otros'
    };
    return labels[category] || category;
}

function viewRecipeDetail(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;
    
    const modal = document.getElementById('recipe-detail-modal');
    const content = document.getElementById('recipe-detail-content');
    
    content.innerHTML = `
        <div class="recipe-detail">
            <div class="recipe-detail-header">
                ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}">` : '<div style="font-size: 5em;">🍰</div>'}
                <h2>${recipe.name}</h2>
                <span class="recipe-category">${getCategoryLabel(recipe.category)}</span>
                <div class="recipe-detail-meta">
                    ${recipe.servings ? `<span>🍽️ ${recipe.servings} porciones</span>` : ''}
                    ${recipe.prepTime ? `<span>⏱️ ${recipe.prepTime} minutos</span>` : ''}
                </div>
            </div>
            <div class="recipe-detail-section">
                <h3>📝 Ingredientes</h3>
                <ul class="ingredients-list">
                    ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
            <div class="recipe-detail-section">
                <h3>👨‍🍳 Instrucciones</h3>
                <div class="instructions">${recipe.instructions}</div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function editRecipe(id) {
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
        openRecipeModal(recipe);
    }
}

async function deleteRecipe(id) {
    if (!confirm('¿Estás seguro de eliminar esta receta?')) return;
    
    try {
        const response = await fetch(`${API_URL}/api/recipes/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            await loadRecipes();
            showSuccess('Receta eliminada correctamente');
        } else {
            showError('Error al eliminar la receta');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Error al eliminar la receta');
    }
}

async function handleRecipeSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData();
    const id = document.getElementById('recipe-id').value;
    
    formData.append('name', document.getElementById('recipe-name').value);
    formData.append('category', document.getElementById('recipe-category').value);
    formData.append('servings', document.getElementById('recipe-servings').value);
    formData.append('prepTime', document.getElementById('recipe-prep-time').value);
    
    const ingredientsText = document.getElementById('recipe-ingredients').value;
    const ingredients = ingredientsText.split('\n').filter(line => line.trim());
    formData.append('ingredients', JSON.stringify(ingredients));
    
    formData.append('instructions', document.getElementById('recipe-instructions').value);
    
    const imageFile = document.getElementById('recipe-image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }
    
    try {
        const url = id ? `${API_URL}/api/recipes/${id}` : `${API_URL}/api/recipes`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            body: formData
        });
        
        if (response.ok) {
            await loadRecipes();
            closeModal(document.getElementById('recipe-modal'));
            showSuccess(id ? 'Receta actualizada correctamente' : 'Receta creada correctamente');
        } else {
            const error = await response.json();
            showError(error.error || 'Error al guardar la receta');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Error al guardar la receta');
    }
}

// ===== INVENTORY =====
async function loadInventory() {
    try {
        const response = await fetch(`${API_URL}/api/inventory`);
        inventory = await response.json();
        displayInventory();
        updateInventorySummary();
    } catch (error) {
        console.error('Error al cargar inventario:', error);
        showError('Error al cargar el inventario');
    }
}

function displayInventory(filteredInventory = null) {
    const tbody = document.getElementById('inventory-tbody');
    const inventoryToDisplay = filteredInventory || inventory;
    
    if (inventoryToDisplay.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    <h3>No hay items en el inventario</h3>
                    <p>Agrega tu primer item para comenzar</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = inventoryToDisplay.map(item => `
        <tr>
            <td><strong>${item.name}</strong></td>
            <td>${getCategoryLabel(item.category)}</td>
            <td>${item.quantity}</td>
            <td>${item.unit}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.supplier || '-'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-success btn-small" onclick="editInventoryItem('${item.id}')">✏️</button>
                    <button class="btn btn-danger btn-small" onclick="deleteInventoryItem('${item.id}')">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateInventorySummary() {
    const totalItems = inventory.length;
    const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-value').textContent = `$${totalValue.toFixed(2)}`;
}

function editInventoryItem(id) {
    const item = inventory.find(i => i.id === id);
    if (item) {
        openInventoryModal(item);
    }
}

async function deleteInventoryItem(id) {
    if (!confirm('¿Estás seguro de eliminar este item?')) return;
    
    try {
        const response = await fetch(`${API_URL}/api/inventory/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            await loadInventory();
            showSuccess('Item eliminado correctamente');
        } else {
            showError('Error al eliminar el item');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Error al eliminar el item');
    }
}

async function handleInventorySubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById('inventory-id').value;
    const data = {
        name: document.getElementById('inventory-name').value,
        category: document.getElementById('inventory-category').value,
        quantity: parseFloat(document.getElementById('inventory-quantity').value),
        unit: document.getElementById('inventory-unit').value,
        price: parseFloat(document.getElementById('inventory-price').value),
        supplier: document.getElementById('inventory-supplier').value,
        notes: document.getElementById('inventory-notes').value
    };
    
    try {
        const url = id ? `${API_URL}/api/inventory/${id}` : `${API_URL}/api/inventory`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            await loadInventory();
            closeModal(document.getElementById('inventory-modal'));
            showSuccess(id ? 'Item actualizado correctamente' : 'Item creado correctamente');
        } else {
            const error = await response.json();
            showError(error.error || 'Error al guardar el item');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Error al guardar el item');
    }
}

// ===== FILTERS =====
function initFilters() {
    // Recipe filters
    const categoryFilter = document.getElementById('category-filter');
    const searchRecipes = document.getElementById('search-recipes');
    
    categoryFilter.addEventListener('change', filterRecipes);
    searchRecipes.addEventListener('input', filterRecipes);
    
    // Inventory filters
    const inventoryCategoryFilter = document.getElementById('inventory-category-filter');
    const searchInventory = document.getElementById('search-inventory');
    
    inventoryCategoryFilter.addEventListener('change', filterInventory);
    searchInventory.addEventListener('input', filterInventory);
}

function filterRecipes() {
    const category = document.getElementById('category-filter').value;
    const search = document.getElementById('search-recipes').value.toLowerCase();
    
    let filtered = recipes;
    
    if (category) {
        filtered = filtered.filter(r => r.category === category);
    }
    
    if (search) {
        filtered = filtered.filter(r => 
            r.name.toLowerCase().includes(search) ||
            r.ingredients.some(ing => ing.toLowerCase().includes(search))
        );
    }
    
    displayRecipes(filtered);
}

function filterInventory() {
    const category = document.getElementById('inventory-category-filter').value;
    const search = document.getElementById('search-inventory').value.toLowerCase();
    
    let filtered = inventory;
    
    if (category) {
        filtered = filtered.filter(i => i.category === category);
    }
    
    if (search) {
        filtered = filtered.filter(i => 
            i.name.toLowerCase().includes(search) ||
            (i.supplier && i.supplier.toLowerCase().includes(search))
        );
    }
    
    displayInventory(filtered);
}

// ===== NOTIFICATIONS =====
function showSuccess(message) {
    alert('✅ ' + message);
}

function showError(message) {
    alert('❌ ' + message);
}
