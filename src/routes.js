const { addbookhandler, getallbookhandler, getspecifiedbookhandler, editbookbyidhandler, deletebookbyidhandler } = require('./handler');

const routes = [
    {
        method:'POST',
        path: '/books',
        handler: addbookhandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getallbookhandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getspecifiedbookhandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editbookbyidhandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deletebookbyidhandler,
    },
];

module.exports = routes;