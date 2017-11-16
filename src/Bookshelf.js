import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
    static propTypes = {
        bookshelfTitle: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        bookcase: PropTypes.object.isRequired,
        onUpdateBookcase: PropTypes.func.isRequired
    }

    render() {
        const {bookshelfTitle, books, bookcase, onUpdateBookcase} = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <Book
                                book={book}
                                key={book.id}
                                bookcase={bookcase}
                                onUpdateBookcase={onUpdateBookcase}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf