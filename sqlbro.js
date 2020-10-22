//Here is the tutorial:
//https://sequelize.org/master/manual/getting-started.html
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class User extends Model {}

User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
    //sync is important: https://sequelize.org/master/manual/model-basics.html#model-synchronization
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
    const simon = await User.create({
        username: 'simondoe',
        birthday: new Date(1999, 6, 20)
    });
    console.log(simon.toJSON());
    findTheBros();
})();

async function findTheBros(){
    // Find all users
    console.log("------NOW FINDING ALL USER MODELS---------")
    const users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
    findOnlyJane();
}

async function findOnlyJane(){
    console.log("---Attempting to find jane :)---");
    const jane = await User.findOne({ where: { username: 'janedoe' } });
    if (jane === null) {
        console.log('Not found!');
    } else {
        console.log("---OMG! i found jane the user:---");
        console.log(jane instanceof User); // true
        console.log(jane.username); // 'My Title'
    }
}