module.exports = (sequelize, Sequelize) => {
	const shift = sequelize.define("shift", {
	 
		shiftID:{
			type: Sequelize.INTEGER
		},
	  employee_name: {
		type: Sequelize.JSON
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
		type: Sequelize.TIME
	  },
	}, 
	
	{
		timestamps: false
	});
  
	return shift;
  };