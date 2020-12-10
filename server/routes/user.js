import express from "express";
import request from "request";
import axios from "axios";
const router = express.Router();

import User from "../models/User";

router.post('/signin/', async (req, res) => {
    console.log(req.body);
    if (req.body.loginType === "Google") {
        const id_token = req.body.id_token;
        console.log(id_token)
        try {
            const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`);
            console.log(response.data)
            const email = response.data.email;
            const picture = response.data.picture;
            const name = response.data.name;

            const user = await User.findOne({Email: email});
            let id;
            if (!user) {
                const newUser = new User({
                                            Username: name, 
                                            Picture: picture,
                                            Email: email
                                        });
                try {
                    await newUser.save();
                    id = newUser._id;
                    console.log("Successfully saved new user!");
                } catch (err) {
                    console.log(err);
                }               
            }
            else {
                id = user._id;
            }
            res.status(200).send({id: id});
            //console.log(JSON.parse(response));
            //res.status(200).send();
        } catch (err) {
            throw(err);
        }
    }
});

router.get('/:id', async (req, res) => {
    console.log(req.params.id)
    const id = req.params.id;

    const user = await User.findOne({_id: id});
    if (!user) {
        res.sendStatus(404);
    }
    else {
        console.log(user)
        res.status(200).send({user: user});
    }
})

export default router;