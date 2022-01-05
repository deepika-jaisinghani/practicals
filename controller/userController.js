const {ExeQuery} = require('../db')

const getAllUserDataAction = async (request, reply) => {
    try {
        let userData = await ExeQuery("select * from user_data", []);
        reply
            .code(200)
            .send(userData);

    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const getUserByIdAction = async (request, reply) => {
    let id = request.params.id;
    try {
        let userData = await ExeQuery("Select * from user_data where user_id=?", [id]);
        reply
            .code(200)
            .send(userData);
    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const deleteUserByIdAction = async (request, reply) => {
    let id = request.params.id;
    try {
        let userData = await ExeQuery("Delete from user_data where user_id=?", [id]);
        reply
            .code(200)
            .send({message: "USER DELETED"}, userData);

    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const postUserDataAction = async (request, reply) => {
    try {
        const {name, age, email} = request.body;
        let userData = await ExeQuery("Insert into user_data(name, age, email)values (?,?,?)", [name, age, email]);
        return reply
            .code(200)
            .send(userData);

    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

const updateUserDataAction = async (request, reply) => {
    let id = request.params.id
    try {
        const {name, age, email} = request.body;
        let userData = await ExeQuery(`update user_data
                                       set name =?,
                                           age=?,
                                           email=?
                                       where user_id = ?`, [name, age, email, id]);
        reply
            .code(200)
            .send({message: "USER UPDATED"},userData);
    } catch (err) {
        reply
            .code(500)
            .send(err);
    }
};

module.exports = {
    getAllUserDataAction,
    getUserByIdAction,
    deleteUserByIdAction,
    postUserDataAction,
    updateUserDataAction
}