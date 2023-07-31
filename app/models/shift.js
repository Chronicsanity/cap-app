module.exports = (sequelize, Sequelize) => {
	const shift = sequelize.define("shift", {
	 
	  employee_name: {
		type: Sequelize.STRING,
		primaryKey: true
	  },
	  jobs: {
		type: Sequelize.STRING
	  },
	  min_title: {
		type: Sequelize.STRING
	  },
	  start_time: {
		type: Sequelize.TIME
	  }, end_time: {
		type: Sequelize.TIME
	  },
	}, 
	
	{
		timestamps: false
	});
  
	return shift;
  };