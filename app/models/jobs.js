module.exports = (sequelize, Sequelize) => {
	const shift = sequelize.define("jobs", {
	 job_value: {
		type: Sequelize.INTEGER,
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