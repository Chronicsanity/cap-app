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
		
	}, 
	
	{
		timestamps: false
	});
  
	return shift;
  };