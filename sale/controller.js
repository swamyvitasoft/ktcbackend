import Salemodel from "../common/salesmodel.js";
import jwt from "jsonwebtoken";

export const addSales = async (req, res) => {
  try {
    const newsale = await Salemodel(req.body);
    newsale.save();
    res.status(200).json(newsale);
  } catch (error) {
    res.status(500).json({ error: "sale registration failed" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const User = await Usermodel.findOne({
      mobileno: req.body.mobileno,
      password: req.body.password,
    });
    if (!User) {
      res.status(404).json("user not found");
    }
    const secretKey = "my-secretKey";
    const token = jwt.sign(
      { mobileno: req.body.mobileno, password: req.body.password },
      secretKey,
      { expiresIn: "1h" }
    );
    res.status(200).json({ User, token });
  } catch (error) {
    res.status(500).json({ error: "user login failed" });
  }
};

export const getAllsales = async (req, res) => {
  try {
    const allsales = await Salemodel.aggregate([
      {
        $lookup: {
          from: "items",
          localField: "itemId",
          foreignField: "_id",
          as: "items",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $match: {
          status: "active",
        },
      },
    ]);
    res.status(200).json(allsales);
  } catch (err) {
    res.status(404).json({ err: "not found" });
  }
};

export const getSalewithId = async (req, res) => {
  try {
    const Sale = await Salemodel.findById(req.params.id);
    res.status(201).json(Sale);
  } catch (error) {
    res.status(500).json({ error: "Internal server Error" });
  }
};

export const saleUpdatebyId = async (req, res) => {
  try {
    const Sale = await Salemodel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(Sale);
  } catch (err) {
    res.status(500).json({ err: "Internal serval error" });
  }
};

export const saleDeletebyId = async (req, res) => {
  const data = {
    status: "deactive",
  };
  try {
    const Sale = await Salemodel.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(201).json(Sale);
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
};
