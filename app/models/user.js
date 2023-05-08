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
	role: {
		type: Sequelize.INTEGER
	}
},{
	timestamps: false
});
  
	return User;
  };