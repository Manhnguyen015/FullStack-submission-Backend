require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/node");

app.use(express.json());
//morgan*****
app.use(morgan("tiny"));
//cors
app.use(cors());
//static
app.use(express.static("dist"));

// Date function to return formatted date
const getFormattedDate = () => {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "shortOffset",
  };

  return now.toLocaleString("en-US", options);
};

//GET method
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});
//POST method
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "missing name or number" });
  }
  // if (persons.find((person) => person.name === body.name)) {
  //   return res.status(400).json({ error: "name already exits in phoneBook" });
  // }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});
//GET
app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      res.status(500).send({ error: "malformed id" });
    });
});

//DELETE method
app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).send({ error: "malformed id" });
    });
});

//GET
app.get("/api/info", (req, res) => {
  Person.countDocuments({}).then((personCount) => {
    const currentDate = getFormattedDate();

    res.send(`
        <p>Phone book has info for ${personCount} people.</p>
        <br/>
        <p>${currentDate}</p>
      `);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
