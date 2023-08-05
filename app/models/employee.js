module.exports = (sequelize, Sequelize, DataTypes) => {
	const Employee = sequelize.define("employee_table", {
		id: {
			type: Sequelize.INTEGER,
            primaryKey: true,
			references: {
				model: 'users', 
				key: 'id'
			}
		},
	  user: {
		type: Sequelize.STRING
	  },
	  job_title: {
		type: Sequelize.STRING
	  },
	  job_value: {
		type: Sequelize.INTEGER
	  },
	
	});
  
	return Employee;
  };