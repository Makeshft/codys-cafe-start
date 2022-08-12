const Sequelize = require('sequelize')
const db = require('./database')

const Coffee = db.define('coffee', {
  // your code here
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: []
  }
});

Coffee.beforeCreate((coffee, options) => {
  if(!coffee.ingredients.includes('love')) {
    coffee.ingredients.push('love');
  }
})

Coffee.afterUpdate((coffee, options) => {
  if(!coffee.ingredients.includes('love')) {
    coffee.ingredients.push('love');
  }
})

Coffee.prototype.getIngredients = function () {
  return this.ingredients.join(', ');
}

Coffee.findByIngredient = function(ingredient) {
  return Coffee.findAll({
    where: {
      ingredients: {
        [Sequelize.Op.contains]: [ingredient]
      }
    }
  })
};


module.exports = Coffee;
