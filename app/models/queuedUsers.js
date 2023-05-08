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
	roles: {
		type: Sequelize.INTEGER,
		foreignKey: 'roles'
	}

	},{
		timestamps: false
	});
  
	return QueuedUser;
  };