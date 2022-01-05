const {ExeQuery} = require('../db')
const fastify = require("fastify");

const GetAllUserData = async (request, reply, error) => {
    try {
        // throw new Error("Internal Server Error");
        let UserData = await ExeQuery("select * from User_data", []);
        reply
            .code(200)
            .send(UserData);

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
        let UserData = await ExeQuery("Select * from User_data where User_id=?", [id]);
        reply
            .code(200)
            .send(UserData);
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
        let UserData = await ExeQuery("Delete from User_data where User_id=?", [id]);
        reply
            .code(200)
            .send({message: "USER DELETED"}, UserData);

    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const PostUserData = async (request, reply) => {
    try {
        // throw new Error("Internal Server Error")
        const {Name, Age, Email} = request.body;
        let UserData = await ExeQuery("Insert into User_data(Name,Age,Email)values (?,?,?)", [Name, Age, Email]);
        console.log("Hello",UserData)
        // fastify.log.error("error hello")
        return reply
            .code(200)
            .send(UserData);

    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const UpdateUserData = async (request, reply) => {
    let id = request.params.id
    console.log("deepika",id)
    console.log("body",request.body)
    try {
        // throw new Error("Internal Server Error")
        const {Name, Age, Email} = request.body;
        let UserData = await ExeQuery(`update User_data set Name=?, Age=?, Email=? where User_id = ?`, [Name, Age, Email, id]);
        reply
            .code(200)
            .send(UserData);
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