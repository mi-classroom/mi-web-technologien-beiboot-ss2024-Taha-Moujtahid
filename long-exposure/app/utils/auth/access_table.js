const access_table = {
    "user":{
        pages : [".*"]
    },
    "anon":{
        pages : ["/", "/login", "/logout"]
    }
}

const hasAccess = function (role, page) {
    if(role === null || role === undefined) role = "anon";
    return access_table[role].pages.some(e => {
        const res = new RegExp(e).test(page)
        return res;
    });
}

module.exports = {access_table, hasAccess};