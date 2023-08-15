module.exports = (sequelize, Sequelize) => {
	const shiftAssignments = sequelize.define("shift_assignments", {
	 
		id:{
			type: Sequelize.INTEGER,
			primaryKey: true
		},
        Assignments: {type: Sequelize.STRING
        
    },
	AmntEmp: {type: Sequelize.INTEGER
        }

	}, 
	
	{
		timestamps: false
	});
  
	return shiftAssignments;
  };