module.exports = (sequelize, Sequelize) => {
	const shiftAssignments = sequelize.define("shift_assignments", {
	 
		id:{
			type: Sequelize.INTEGER,
			primaryKey: true
		},
        Assignments: {
			type: Sequelize.STRING
        
    },
	AmntEmp: {
		type: Sequelize.INTEGER
        },
		DaysAssigned: {
			type: Sequelize.STRING
		}

	}, 
	
	{
		timestamps: false
	});
  
	return shiftAssignments;
  };