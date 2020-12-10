import express from "express";
const router = express.Router();

import Restaurant from "../models/Restaurant";
// Name, Price, Station, Type, HowManyPeople, Reason
router.post("/addRes", async (req, res, next) => {
    console.log(req.body)
    const ResInfo = {
        Name: req.body.Name,
        Price: req.body.Price,
        Station: req.body.Station,
        Type: req.body.Type,
        HowManyPeople: req.body.HowManyPeople,
        Reason: req.body.Reason,
        OfficialRating: req.body.Rating
    }

    const result = await Restaurant.findOne({Name: ResInfo.Name, Station: ResInfo.Station});
    console.log(result);
    if (result) {
        res.json({
            success: false,
            msg: "Restaurant has already existed!"
        }) 
    }
    else {
        const newRes = new Restaurant (ResInfo);
        try {
            await newRes.save();
            res.json({
                success: true,
                msg: "Restaurant is successfully saved!"
            })
        } catch (err) {
            console.log(err)
            res.json({
                success: false,
                msg: "Restaurant cannot be saved."
            })
        }
    }

});

router.post("/getRestaurants", async (req, res) => {
    const query = {};
    // for (const [key, value] of Object.entries(req.body)) {
    //     if (value.length !== 0) 
    //         query[key] = value;
    // }
    if (req.body.Name.length !== 0) query.Name = req.body.Name;
    if (req.body.Price.length !== 0) query.Price = req.body.Price;
    if (req.body.Type.length !== 0) query.Type = req.body.Type;
    if (req.body.Station.length !== 0) query.Station = {$in: req.body.Station};
    if (req.body.HowManyPeople.length !== 0) query.HowManyPeople = {$in: req.body.HowManyPeople};
    if (req.body.Reason.length !== 0) query.Reason = {$in: req.body.Reason};
    // {Name: xxx, Price: xxx, Station: {$in: []}, Type: xxx, HowManyPeople: {$in: []}, Reason: {$in: []}}
    try {
        const result = await Restaurant.find(query);
        console.log(result);
        res.status(200).send({result: result});
    } catch (err) {
        res.sendStatus(404);
    }
});

router.get("/getAllRes", async (req, res, next) => {
    try {
        const allRes = await Restaurant.find();
        console.log(allRes);
        res.status(200).send({res: allRes});
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

export default router;