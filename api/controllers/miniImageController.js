const MiniImage = require('../models/MiniImage');

exports.getAllMiniImages = async (req, res) => {
    try {
        console.log("enter getAllMiniImages");
        const miniImages = await MiniImage.find({});
        console.log(miniImages);
        res.status(200).json({
            miniImages
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getMiniImageById = async (req, res) => {
    try {
        const miniImage = await MiniImage.findById(req.params.id);

        res.status(200).json({
            miniImage
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.addMiniImage = async (req, res) => {
    try {
        console.log("addMiniImage");
        const miniImage = await MiniImage.create(req.body);

        res.status(201).json({
            miniImage
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.updateMiniImage = async (req, res) => {
    try {
        const miniImage = await MiniImage.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            miniImage
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.deleteMiniImage = async (req, res) => {
    try {
        const miniImage = await MiniImage.findByIdAndDelete(req.params.id);

        res.status(200).json({
            miniImage
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};