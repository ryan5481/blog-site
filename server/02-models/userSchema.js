const mongoose = require ("mongoose");

const userSchema = ({

    fullName: {
        type: String,
    },
    
    email: {
        type: String,
    },
    
    password: {
        type: Object,
    },
    
    createdAt: { type: Date, default: Date.now },
    
    updatedAt: { type: Date, default: Date.now },

})

const User = mongoose.model("User", userSchema);

module.exports = User