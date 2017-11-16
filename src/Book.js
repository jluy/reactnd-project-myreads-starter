import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        bookcase: PropTypes.object.isRequired,
        book: PropTypes.object.isRequired,
        onUpdateBookcase: PropTypes.func.isRequired,
    }

    render() {
        const {book, bookcase, onUpdateBookcase} = this.props
        let authors
        if (book.authors == null) {
            // console.log("BAD BOOK", book)
            authors = [""]
        }
        else {
            authors = book.authors
        }
        const listAllBooks = []
        Object.keys(bookcase).map(key => {
            bookcase[key].books.map(b => {
                listAllBooks.push(b)
                return b
            })
            return key
        })
        let matchedBook = listAllBooks.filter(b => b.id === book.id)
        let shelf
        if (matchedBook.length < 1) {
            shelf = "none"
        }
        else {
            shelf = matchedBook[0].shelf
        }

        let image
        if (book.imageLinks != null) {
            image = book.imageLinks.thumbnail
        }
        else {
            image = ""
        }

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={{width: 128, height: 192, backgroundImage: `url(" ${image}"`}}>
                        </div>
                        <div className="book-shelf-changer">
                            <select
                                value={shelf}
                                onChange={(e) => onUpdateBookcase(book, e.target.value)}
                            >
                                <option value="move" disabled>Move to...</option>
                                {
                                    Object.keys(bookcase).map(shelf => (
                                            <option
                                                key={shelf}
                                                value={shelf}
                                            >{bookcase[shelf].bookshelfTitle} </option>
                                        )
                                    )
                                }
                                <option value="none" key="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{authors.join(', ')}</div>
                </div>
            </li>
        )
    }
}

export default Book