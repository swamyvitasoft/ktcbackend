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

export const getTopsales = async (req, res) => {
  try {
    const tosales = await Salemodel.aggregate([
      {
        $match: {
          status: "active",
        },
      },
      {
        $lookup: {
          from: "items",
          localField: "itemId",
          foreignField: "_id",
          as: "items",
        },
      },
      {
        $group: {
          _id: "$itemId",
          count: {
            $sum: 1,
          },
          totalAdvanceAmount: {
            $sum: "$advanceamount",
          },
          totalEstimatedAmount: {
            $sum: "$estimatedamount",
          },
          totalBalanceAmount: {
            $sum: "$balaceamount",
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $lookup: {
          from: "items",
          localField: "_id",
          foreignField: "_id",
          as: "items",
        },
      },
    ]);
    res.status(200).json(tosales);
  } catch (err) {
    res.status(404).json({ err: "not found" });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const allcustomers = await Salemodel.aggregate([
      {
        $match: {
          status: "active",
        },
      },
      {
        $group: {
          _id: "$mobileno",
          count: {
            $sum: 1,
          },
          fullname: {
            $first: "$fullname",
          },
          totalAdvanceAmount: {
            $sum: "$advanceamount",
          },
          totalEstimatedAmount: {
            $sum: "$estimatedamount",
          },
          totalBalanceAmount: {
            $sum: "$balaceamount",
          },
        },
      },
    ]);
    res.status(200).json(allcustomers);
  } catch (err) {
    res.status(404).json({ err: "not found" });
  }
};

export const getYearly = async (req, res) => {
  try {
    const yearlyData = await Salemodel.aggregate([
      {
        $match: {
          status: "active",
        },
      },
      {
        $group: {
          _id: {
            $year: "$createdAt",
          },
          count: {
            $sum: 1,
          },
          totalAdvanceAmount: {
            $sum: "$advanceamount",
          },
          totalEstimatedAmount: {
            $sum: "$estimatedamount",
          },
          totalBalanceAmount: {
            $sum: "$balaceamount",
          },
        },
      },
    ]);
    res.status(200).json(yearlyData);
  } catch (err) {
    res.status(404).json({ err: "not found" });
  }
};

export const getMonthly = async (req, res) => {
  try {
    const monthlyData = await Salemodel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(req.body.fromYear, 0, 1),
            $lt: new Date(req.body.nextYear, 0, 1),
          },
        },
      },
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          createdAt: {
            $first: "$createdAt",
          },
          estimatedTotalAmount: {
            $sum: "$estimatedamount",
          },
          advanceTotalAmount: {
            $sum: "$advanceamount",
          },
          balanceTotalAmount: {
            $sum: "$balaceamount",
          },
        },
      },
    ]);
    res.status(200).json(monthlyData);
  } catch (err) {
    res.status(404).json({ err: "not found" });
  }
};

export const getDaily = async (req, res) => {
  try {
    const dailyData = await Salemodel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(req.body.year, (req.body.month-1), 1),
            $lt: new Date(req.body.year, req.body.month, 1)
          },
        },
      },
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },
          createdAt: {
            $first: "$createdAt",
          },
          totalEstimatedAmount: {
            $sum: "$estimatedamount",
          },
          totalAdvanceAmount: {
            $sum: "$advanceamount",
          },
          totalBalanceAmount: {
            $sum: "$balaceamount",
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          createdAt: 1,
          totalEstimatedAmount: 1,
          totalAdvanceAmount: 1,
          totalBalanceAmount: 1,
        },
      },
    ]);
    res.status(200).json(dailyData);
  } catch (err) {
    res.status(404).json({ err: "not found" });
  }
};

export const getExport = async (req, res) => {
  let datefrom = req.body.datefrom;
  let dateto = req.body.dateto;
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
          createdAt: {
            $gte: new Date(datefrom),
            $lt: new Date(dateto),
          },
          status: "active",
        },
      },
    ]);
    res.status(200).json(allsales);
  } catch (err) {
    res.status(404).json({ err: "not found" });
  }
};
