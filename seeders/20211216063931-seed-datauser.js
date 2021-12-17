'use strict';
const fs = require('fs')
// const fs = require('../data/datauser.json')

// let data = JSON.parse(fs.readFileSync("../data/datauser.json"))
// data.forEach(v => {
//   v.createdAt = new Date(),
//     v.updatedAt = new Date()
// });

// console.log(data);

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let data = JSON.parse(fs.readFileSync("./data/datauser.json"))
     data.forEach(v => {
       v.createdAt = new Date(),
         v.updatedAt = new Date()
     });
     
     return queryInterface.bulkInsert("Users", data)
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', null, {})
  }
};
