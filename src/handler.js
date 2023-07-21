const books = require('./books');
const { nanoid } = require('nanoid');

const addbookhandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = false;
    if(pageCount === readPage){
        finished = true;
    };
    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
    }
    if (readPage > pageCount){
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }
    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt, finished
    };
    books.push(newBook);

    const success = books.filter((book) => book.id === id).length > 0;
    if(success){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku',
    });
    response.code(500);
    return response;

}

const getallbookhandler = (request, h) => {
    const { name, reading, finished } = request.query;

    if(name !== undefined){
        const response = h.response({
        status: 'success',
        data: {
            books: books.filter((book) => book.name.toLowerCase().match(name.toLowerCase())).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
            })),
        },
        }).code(200);
        return response;
    }

    if(reading !== undefined){
        const response = h.response({
        status: 'success',
        data: {
            books: books.filter((book) => book.reading === (reading == true)).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
            })),
        },
        }).code(200);
        return response;
    }

    if( finished !== undefined){
        const response = h.response({
        status: 'success',
        data: {
            books: books.filter((book) => book.finished === (finished == true)).map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
            })),
        },
        }).code(200);
        return response;
    }

    const response = h.response ({
        status: 'success',
        data: {
        books: books.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher
        })),
        },
    }).code(200);
    return response;
    };

    const getspecifiedbookhandler = (request, h) => {
        const { id } = request.params;
        const book = books.filter((n)=> n.id === id)[0];
        if(book !== undefined){
            return{
                status:'success',
                data:{
                    book,
                }
            };
        }
        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        }).code(404);
        return response;
};

const editbookbyidhandler = (request, h) => {
    const {id} = request.params;
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id == id);
    let finished = false;
    if(pageCount === readPage){
        finished = true;
    };
    
    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }
    if (readPage > pageCount){
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author, summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
            finished,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
    return response;
}

const deletebookbyidhandler = (request, h) => {
    const {id} = request.params;
    const index = books.findIndex((book) => book.id == id);
    if(index !== -1){
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
    return response;
}

module.exports = { addbookhandler, getallbookhandler, getspecifiedbookhandler, editbookbyidhandler, deletebookbyidhandler };