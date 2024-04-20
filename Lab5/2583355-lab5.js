import express from "express";
var app = express();
export const cars = [
    {
        "id": 1,
        "name": "Toyota",
        "model": "Camry",
        "year": 2020,
        "color": "Red",
        "engineType": "V6"
    },
    {
        "id": 2,
        "name": "Honda",
        "model": "Accord",
        "year": 2019,
        "color": "Silver",
        "engineType": "Inline-4"
    },
    {
        "id": 3,
        "name": "Chevrolet",
        "model": "Camaro",
        "year": 2022,
        "color": "Yellow",
        "engineType": "V8"
    },
    {
        "id": 4,
        "name": "Tesla",
        "model": "Model S",
        "year": 2020,
        "color": "White",
        "engineType": "Electric"
    },
    {
        "id": 5,
        "name": "BMW",
        "model": "X5",
        "year": 2021,
        "color": "Black",
        "engineType": "Inline-6"
    }
];



app.use(express.json());

app.get("/cars", (req, res) => {
  res.json(cars);
});

app.get("/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let car = cars.find((item) => item.id === id);
  if (!car) {
    return res.status(404).json({ message: "Car not found!!!!" });
  } else {
    res.json(car);
  }
});

app.post("/cars", (req, res) => {
  const ncar = req.body;
  ncar.id = cars.length + 1;
  cars.push(ncar);
  res.status(201).json(ncar);
});


app.put("/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const ucar = req.body;
  ucar.id = id;
  const carIndex = cars.findIndex((i) => i.id === id);
  if (carIndex !== -1) {
    cars[carIndex] = req.body;
    res.send(cars[carIndex]);
  } else {
    res.status(404).json({ message: "Car Not Found!!!!" });
  }
});

app.delete("/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let car = cars.findIndex((item) => item.id == id);
  if (car != -1) {
    cars.splice(car, 1)
    res.send("Deleted Car")
  } else {
    res.status(404).json({message:"Car with the given id does not exist!!!!!"})
  }
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("REST API demo app listening at http://%s:%s", host, port);
});



