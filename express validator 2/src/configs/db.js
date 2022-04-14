const mongoose = require("mongoose")

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/validations",{
        // useNewUrlParser: true,
        // useUnifiedTopology:true,
        // useCreateIndex:true,
        // useFineAndModify:true,
    });
};

module.exports = connect;
