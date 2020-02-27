const controllers = {};

var sequelize = require("../model/database");
var Employee = require("../model/Employee");
var Role = require("../model/Role");

// check if there're tables
sequelize.sync();

//// Controller Delete
controllers.delete = async (req, res) => {
  // parameter post
  const { id } = req.body;
  // delete sequelize
  const del = await Employee.destroy({
    where: { id: id }
  });
  res.json({ success: true, deleted: del, message: "Deleted successful" });
};

//Controller Get(Edit)
controllers.get = async (req, res) => {
  const { id } = req.params;

  const data = await Employee.findAll({
    where: { id: id },
    include: [Role]
  })
    .then(function(data) {
      return data;
    })
    .catch(error => {
      return error;
    });
  res.json({ success: true, data: data });
};

///// Update Controller
controllers.update = async (req, res) => {
  // parameter get id
  const { id } = req.params;
  // parameter POST
  const { name, email, address, phone, role } = req.body;
  // Update data
  const data = await Employee.update(
    {
      name: name,
      email: email,
      address: address,
      phone: phone,
      roleId: role
    },
    {
      where: { id: id }
    }
  )
    .then(function(data) {
      return data;
    })
    .catch(error => {
      return error;
    });
  res.json({ success: true, data: data, message: "Updated successful" });
};

// Controller Read
controllers.list = async (req, res) => {
  const data = await Employee.findAll({
    include: [Role]
  })
    .then(function(data) {
      return data;
    })
    .catch(error => {
      return error;
    });

  res.json({ success: true, data: data });
};

// Controller Create
controllers.create = async (req, res) => {
  // Data
  const { name, email, address, phone, role } = req.body;

  //Create
  const data = await Employee.create({
    name: name,
    email: email,
    address: address,
    phone: phone,
    roleId: role
  })
    .then(function(data) {
      return data;
    })
    .catch(error => {
      console.log("Errorazo " + error);
      return error;
    });
  // return res
  res.status(200).json({
    success: true,
    message: "Guardo exitosamente",
    data: data
  });
};

module.exports = controllers;
