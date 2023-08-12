module.exports = (sequelize, Sequelize) => {
	const weekofshifts = sequelize.define("weekofshifts", {
	 
		id:{
			type: Sequelize.INTEGER,
			primaryKey: true
		},
        
        AmntEmp: {type: Sequelize.INTEGER
    },
        Assignments: {type: Sequelize.STRING
        }

	}, 
	
	{
		timestamps: false
	});
  
	return weekofshifts;
  };