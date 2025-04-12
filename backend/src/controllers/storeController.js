const Store = require('../models/storeModel');

const createStore = async (req, res) => {
    try {
        const { name, email, address } = req.body;
        const store = await Store.create({
            name,
            email,
            address,
            rating: 1
        });
        res.status(201).json(store);
    } catch (error) {
        console.error('Error creating store:', error);
        res.status(500).json({
            message: error.message || "Some error occurred while creating the store."
        });
    }
};

const getAllStores = async (req, res) => {
    try {
        console.log("Fetching Stores");
        const stores = await Store.findAll();
        res.status(201).send(stores);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving stores.", error });
    }
};

const getStoreById = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findByPk(id);
        if (!store) {
            return res.status(404).json({
                message: `Store not found with id ${id}`
            });
        }
        res.status(200).json(store);
    } catch (error) {
        console.error('Error retrieving store:', error);
        res.status(500).json({
            message: error.message || `Error retrieving store with id ${req.params.id}`
        });
    }
};

const getUserStores = async (req, res) => {
    const { userId } = req.params;

    try {
        const stores = await Store.findAll({ 
            where: { ownerId: userId }, 
        });
    
        if (!stores || stores.length === 0) {
            return res.status(404).json({ message: 'No stores found for this user' });
        }

        res.status(200).json(stores[0]);
    } catch (error) {
        console.error('Error fetching user stores:', error);
        res.status(500).json({ message: 'Error fetching user stores', error });
    }
}

const updateStore = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRowsCount] = await Store.update(req.body, {
            where: { id }
        });
        if (updatedRowsCount === 0) {
            return res.status(404).json({
                message: `Store not found with id ${id}`
            });
        }
        const updatedStore = await Store.findByPk(id);
        res.status(200).json(updatedStore);
    } catch (error) {
        console.error('Error updating store:', error);
        res.status(500).json({
            message: error.message || `Error updating store with id ${req.params.id}`
        });
    }
};

const deleteStore = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await Store.findByPk(id);

        if (!store) {
            return res.status(404).json({
                message: `Store not found with id ${id}`
            });
        }
        await store.destroy();

        res.status(200).json({ message: "Store deleted successfully!" });
    } catch (error) {
        console.error('Error deleting store:', error);
        res.status(500).json({
            message: error.message || `Could not delete store with id ${req.params.id}`
        });
    }
};

module.exports={createStore,getAllStores,getStoreById,updateStore,deleteStore,getUserStores};