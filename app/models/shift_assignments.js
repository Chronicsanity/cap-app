module.exports = (sequelize, Sequelize) => {
	const shiftAssignments = sequelize.define("shift_assignments", {
	 
		id:{
			type: Sequelize.INTEGER,
			primaryKey: true
		},
        Assignments: {
			type: Sequelize.STRING
        
    },
	
		DaysAssigned: {
			type: Sequelize.STRING
		},
	min_title: {
		type: Sequelize.STRING
	}

	}, 
	
	{
		timestamps: false
	});
  
	return shiftAssignments;
  };