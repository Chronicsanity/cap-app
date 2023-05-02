module.exports = (sequelize, Sequelize) => {
	const QueuedUser = sequelize.define("queued_users", {
	  username: {
		type: Sequelize.STRING
	  },
	  password: {
		type: Sequelize.STRING
	  },
	  email: {
		type: Sequelize.STRING
	  },
	  id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},  
	createdAt: false,
	updatedAt: false,
	timestamps: false
	},{
	
	});
  
	return QueuedUser;
  };