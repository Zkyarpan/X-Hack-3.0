import Plant from "../models/PlantModel.js";
import cloudinary from "cloudinary";

export const addPlant = async (req, res) => {
  try {
    const farmerId = req.user.id;
    let {
      name,
      quantity,
      price,
      location,
      deliveryTime,
      description,
      category,
      harvestDate,
      shelfLife,
    } = req.body;

    shelfLife = parseInt(shelfLife);

    category = category.toLowerCase();

    const imageUrls = [];
    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "plant_images",
          public_id: `plant_${Date.now()}_${Math.random()
            .toString(36)
            .substring(7)}`,
        });
        imageUrls.push(result.secure_url);
      }
    }

    const plant = new Plant({
      farmerId,
      name,
      quantity,
      price,
      location,
      deliveryTime,
      description,
      category,
      harvestDate,
      shelfLife,
      images: imageUrls,
    });

    await plant.save();

    res.status(201).json({
      StatusCode: 201,
      IsSuccess: true,
      ErrorMessage: null,
      Result: plant,
    });
  } catch (error) {
    console.error("Error adding plant:", error);
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: error.message,
      Result: null,
    });
  }
};

export const updatePlant = async (req, res) => {
  try {
    const { plantId } = req.params;
    const updates = req.body;
    const plant = await Plant.findOneAndUpdate(
      { _id: plantId, farmerId: req.user.id },
      updates,
      { new: true }
    );

    if (!plant) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "Plant not found or unauthorized",
        Result: null,
      });
    }

    res.json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: null,
      Result: plant,
    });
  } catch (error) {
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error updating plant",
      Result: null,
    });
  }
};

export const deletePlant = async (req, res) => {
  try {
    const { plantId } = req.params;
    const plant = await Plant.findOneAndDelete({
      _id: plantId,
      farmerId: req.user.id,
    });

    if (!plant) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "Plant not found or unauthorized",
        Result: null,
      });
    }

    res.json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: null,
      Result: { message: "Plant deleted successfully" },
    });
  } catch (error) {
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error deleting plant",
      Result: null,
    });
  }
};

export const getFarmerPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ farmerId: req.user.id });
    res.json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: null,
      Result: plants,
    });
  } catch (error) {
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error fetching plants",
      Result: null,
    });
  }
};

export const getPlantDetails = async (req, res) => {
  try {
    const { plantId } = req.params;
    const plant = await Plant.findById(plantId);

    if (!plant) {
      return res.status(404).json({
        StatusCode: 404,
        IsSuccess: false,
        ErrorMessage: "Plant not found",
        Result: null,
      });
    }

    res.json({
      StatusCode: 200,
      IsSuccess: true,
      ErrorMessage: null,
      Result: plant,
    });
  } catch (error) {
    res.status(500).json({
      StatusCode: 500,
      IsSuccess: false,
      ErrorMessage: "Error fetching plant details",
      Result: null,
    });
  }
};
