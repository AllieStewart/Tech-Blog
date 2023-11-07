const { User } = require('../models');

const userData = [
    {
        username: 'AmandaB',
        password: 'abyes514@'

    },
    {
        username: 'Paul765',
        password: 'nothankyou4'
    },
    {
        username: 'Darren.',
        password: 'Ly2Et*gqA'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;