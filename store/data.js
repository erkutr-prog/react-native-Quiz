'use-strict'

import { observable } from "mobx";

var data = observable({
    isLoggedIn: false,
    username: '',
    email: ''
})

module.exports = data;