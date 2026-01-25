const express = require('express')
const app = express()
const userData = require('./data')

app.get("/", (req, res) => {
    res.send("server is running")
})

app.get("/user/:id/:lang/:tab", (req, res) => {

    const id = parseInt(req.params.id)
    const lang = req.params.lang
    const tab = req.params.tab

    const user = userData.find(user => user.id === id)

    if (!user) {
        return res.status(404).send("User not found")
    }

    let message = ""

    // tab logic
    if (tab === "info") {
        message = "info tab"
    } 
    else if (tab === "post") {
        message = "post tab"
    } 
    else if (tab === "settings") {
        message = "settings tab"
    }

    // language logic
    if (lang === "english") {
        message += " (english)"
    } 
    else if (lang === "hindi") {
        message += " (hindi)"
    }

    res.json({
        user,
        tab,
        lang,
        message
    })
})

app.listen(4000, () => {
    console.log("server is running continue")
})
