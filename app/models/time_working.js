module.exports = (sequelize, Sequelize) => {
	const Time_Working = sequelize.define("time_working", {
	  id: {
		type: Sequelize.INTEGER,
        primaryKey: true
	  },
	  date: {
		type: Sequelize.INTEGER
	  },
	  starting_at: {
		type: Sequelize.INTEGER
	  },
	  ending_at: {
		type: Sequelize.INTEGER,
		
	}, 

	},{
		timestamps: false
	});
  
	return Time_Working;
  };