const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")
const mongoose = require("mongoose")
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://sarath:sarath123@cluster0.u4ujc20.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0').then((data) => console.log("monggose conncted....")).catch(() => { "mongoose not conncted" })
const bulkmodel = mongoose.model("email", {}, "bulkmail")

app.post("/sendmail", function (req, res) {
    const msg = req.body.msg
    const emailList = req.body.emailList
    bulkmodel.find().then((data) => {
        console.log(data[0].toJSON().user)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: data[0].toJSON().user,
                pass: data[0].toJSON().pass
            }
        });

        new Promise(async function (resolve, reject) {
            try {
                for (let i = 0; i < emailList.length; i++) {
                    await transporter.sendMail(
                        {
                            from: "sarath0001@agmail.com",
                            to: emailList[i],
                            subject: "A massage from Bulk Mail App",
                            text: msg
                        },)
 console.log(emailList[i])                }
                resolve("success")
            } catch (error) { reject("failed") }
        }).then(() => { res.send(true) }).catch(() => { false })
    }).catch(() => { console.log("error") })
})
app.listen(4000, () => console.log("server connected....."))    