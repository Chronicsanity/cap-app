module.exports = (sequelize, Sequelize) => {
	const shift = sequelize.define("shift", {
	 
	  employee_name: {
		type: Sequelize.JSON,
		primaryKey: true
	  },
	  jobs: {
		type: Sequelize.STRING
	  },
	  min_title: {
		type: Sequelize.STRING
	  },
	  time_start: {
		type: Sequelize.TIME
	  }, time_end: {
		type: Sequelize.TIME
	  }, date: {
		type: Sequelize.DATETIME
	  },
	}, 
	
	{
		timestamps: false
	});
  
	return shift;
  };