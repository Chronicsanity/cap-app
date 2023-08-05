module.exports = (sequelize, Sequelize) => {
	const shift = sequelize.define("jobs", {
	 job_value: {
		type: Sequelize.INTIGER,
	 },
	  jobs: {
		type: Sequelize.STRING,
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