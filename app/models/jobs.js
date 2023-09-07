module.exports = (sequelize, Sequelize) => {
	const shift = sequelize.define("jobs", {
	 job_value: {
		type: Sequelize.STRING,
	 },
	  jobs: {
		type: Sequelize.STRING,
		primaryKey: true
	  },
	  min_title: {
		type: Sequelize.STRING
	  },
	}, 
	
	{
		timestamps: false
	});
  
	return shift;
  };