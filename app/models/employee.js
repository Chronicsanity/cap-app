module.exports = (sequelize, Sequelize) => {
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
	  date_working: {
		type: Sequelize.STRING
	  },
	
	});
  
	return Employee;
  };