module.exports = (sequelize, Sequelize) => {
	const shift = sequelize.define("jobs", {
	 
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