const {exeQuery} = require('../db')

const getAllUserData = async (request, reply) => {
    try {
        throw new Error("Internal Server Error")
        let userData = await exeQuery("select * from Userdata", []);
        reply
            .code(200)
            .send(userData);
    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const getUserById = async (request, reply) => {
    let id = request.params.id;
    try {
        throw new Error("Internal Server Error")
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

const deleteUserById = async (request, reply) => {
    let id = request.params.id;
    try {
        throw new Error("Internal Server Error")
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

const postUserData = async (request, reply) => {
    try {
        throw new Error("Internal Server Error")
        const {Name, Age, Email} = request.body;
        let userData = await exeQuery("Insert into Userdata(Name,Age,Email)values (?,?,?)", [Name, Age, Email]);
        reply
            .code(200)
            .send(userData);
    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const updateUserData = async (request, reply) => {
    let id = request.params.id;
    try {
        throw new Error("Internal Server Error")
        const {Name, Age, Email} = request.body;
        let userData = await exeQuery(`update Userdata
                                       set Name=?,
                                           Age=?,
                                           Email=?
                                       where User_id = ${id}`, [Name, Age, Email]);
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
    getAllUserData,
    getUserById,
    deleteUserById,
    postUserData,
    updateUserData
}