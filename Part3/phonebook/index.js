const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
//morgan*****
app.use(morgan("tiny"));
//cors
app.use(cors());
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

const generateId = () => {
  const maxID =
    notes.length > 0 ? Math.max(...notes.map((p) => Number(p.id))) : 0;
  return String(maxID + 1);
};

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "missing name or number" });
  }
  if (persons.find((person) => person.name === body.name)) {
    return res.status(400).json({ error: "name already exits in phoneBook" });
  }
  const person = {
    id: generateId(),
    number: body.number,
    name: body.name,
  };

  persons = persons.concat(person);

  res.json(person);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  person = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.get("/api/info", (req, res) => {
  const personCount = persons.length;
  const currentDate = getFormattedDate();

  res.send(`
    <p>Phone book has info for ${personCount} people.</p>
    <br/>
    <p>${currentDate}</p>
  `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
