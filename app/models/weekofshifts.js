module.exports = (sequelize, Sequelize) => {
	const weekofshifts = sequelize.define("weekofshifts", {
	 
		id:{
			type: Sequelize.INTEGER,
			primaryKey: true
		},
	  Mon: {
		type: Sequelize.JSON
	  },
	  Tue: {
		type: Sequelize.JSON
	  },
	  Wed: {
		type: Sequelize.JSON
	  }, Thu: {
		type: Sequelize.JSON
	  }, Fri: {
		type: Sequelize.JSON
	  }, Sat: {
		type: Sequelize.JSON
	  }, Sun: {
		type: Sequelize.JSON
	  },
	}, 
	
	{
		timestamps: false
	});
  
	return weekofshifts;
  };