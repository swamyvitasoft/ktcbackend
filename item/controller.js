import Itemmodel from "../common/itemsmodel.js";

export const addItems = async (req, res) => {
  try {
    const newitem = await Itemmodel(req.body);
    newitem.save();
    res.status(200).json(newitem);
  } catch (error) {
    res.status(500).json({ error: "item registration failed" });
  }
};

export const getAllitems = async (req, res) => {
  try {
    const allitems = await Itemmodel.find({status:"active"});
    res.status(200).json(allitems);
  } catch (err) {
    res.status(404).json({ err: "not found" });
  }
};

export const getItemwithId = async (req, res) => {
  try {
    const Item = await Itemmodel.findById(req.params.id);
    res.status(201).json(Item);
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
};

export const itemUpdatebyId = async (req, res) => {
  try {
    const Item = await Itemmodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(Item);
  } catch (err) {
    res.status(500).json({ err: "Internal serval error" });
  }
};

export const itemDeletebyId = async (req, res) => {
  const data = {
    status: "deactive",
  };
  try {
    const Item = await Itemmodel.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(201).json(Item);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
};
