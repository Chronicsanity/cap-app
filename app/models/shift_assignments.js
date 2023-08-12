module.exports = (sequelize, Sequelize) => {
	const shiftAssignments = sequelize.define("shift_assignments", {
	 
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
  
	return shiftAssignments;
  };