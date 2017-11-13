import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
    static propTypes = {
        bookshelfTitle: PropTypes.string.isRequired,
        bookshelf: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        bookcase: PropTypes.object.isRequired
    }

    render() {
        const {bookshelfTitle, books, bookcase, bookshelf} = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <Book
                                title={book.title}
                                authors={book.authors.join(', ')}
                                cover_location={book.cover_location}
                                cover_height={book.cover_height}
                                cover_width={book.cover_width}
                                key={book.title}
                                bookcase={bookcase}
                                bookshelf={bookshelf}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf