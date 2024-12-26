"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResponseHandler = void 0;
const userResponseHandler = (user) => {
    const { password } = user, rest = __rest(user, ["password"]);
    if (user) {
        user = rest;
    }
    user = Object.fromEntries(Object.entries(user).map(([key, value]) => {
        return value === null ? [key, undefined] : [key, value];
    }));
    return user;
};
exports.userResponseHandler = userResponseHandler;
