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
	  userID: {
		type: Sequelize.STRING
	  },
	});
  
	return QueuedUser;
  };