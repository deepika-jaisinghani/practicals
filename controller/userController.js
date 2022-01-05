const {exeQuery} = require('../db')

const GetAllUserData = async (request, reply, error) => {
    try {
        // throw new Error("Internal Server Error");
        let userData = await exeQuery("select * from Userdata", []);
        reply
            .code(200)
            .send(userData);

        if (error.validation) {
            reply
                .code(422)
                .send(new Error('Validation Failed'));
        }
    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const GetUserById = async (request, reply) => {
    let id = request.params.id;
    try {
        // throw new Error("Internal Server Error")
        let userData = await exeQuery("Select * from Userdata where User_id=?", [id]);
        reply
            .code(200)
            .send(userData);
    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const DeleteUserById = async (request, reply) => {
    let id = request.params.id;
    try {
        // throw new Error("Internal Server Error")
        let userData = await exeQuery("Delete from Userdata where User_id=?", [id]);
        reply
            .code(200)
            .send({message: "USER DELETED"}, userData);

    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const PostUserData = async (request, reply, error) => {
    try {
        // throw new Error("Internal Server Error")
        const {Name, Age, Email} = request.body;
        let userData = await exeQuery("Insert into Userdata(Name,Age,Email)values (?,?,?)", [Name, Age, Email]);
        reply
            .code(200)
            .send(userData);
        if (error.validation) {
            reply
                .code(422)
                .send(new Error('Validation failed'));
        }
    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const UpdateUserData = async (request, reply) => {
    let id = request.params.id;
    console.log("deepika",id)
    try {
        // throw new Error("Internal Server Error")
        const {Name, Age, Email} = request.body;
        let userData = await exeQuery(`UPDATE Userdata set Name=?, Age=?, Email=? where User_id = ${id}`, [Name, Age, Email]);
        reply
            .code(200)
            .send(userData);
    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

module.exports = {
    GetAllUserData,
    GetUserById,
    DeleteUserById,
    PostUserData,
    UpdateUserData
}