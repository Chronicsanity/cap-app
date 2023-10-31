module.exports = (sequelize, Sequelize) => {
	const shift = sequelize.define("jobs", {
	 job_value: {
		type: Sequelize.JSON,
	 },
	  jobs: {
		type: Sequelize.STRING,
		primaryKey: true
	  },
	  min_title: {
		type: Sequelize.JSON
	  },
	}, 
	
	{
		timestamps: false
	});
  
	return shift;
  };