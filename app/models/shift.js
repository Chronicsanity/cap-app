module.exports = (sequelize, Sequelize) => {
	const shift = sequelize.define("shift", {
	  id: {
		type: Sequelize.INTEGER,
        primaryKey: true
	  },
	  employee_name: {
		type: Sequelize.STRING
	  },
	  jobs: {
		type: Sequelize.STRING
	  },
	  min_title: {
		type: Sequelize.STRING
	  },
	  start_time: {
		type: Sequelize.DATETIME
	  }, end_time: {
		type: Sequelize.DATETIME
	  },
	}, 
	
	{
		timestamps: false
	});
  
	return shift;
  };