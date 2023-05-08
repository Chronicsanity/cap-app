module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("users", {
	  username: {
		type: Sequelize.STRING
	  },
	  email: {
		type: Sequelize.STRING
	  },
	  password: {
		type: Sequelize.STRING
	},  
	
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},  
	roles: {
		type: Sequelize.INTEGER,
		foreignKey: 'roles'
	  },
},{
	timestamps: false
});
  
	return User;
  };