import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'
import {Link} from 'react-router-dom'

class Bookcase extends Component {
    static propTypes = {
        bookcase: PropTypes.object.isRequired,
        onUpdateBookcase: PropTypes.func.isRequired,
    }

    render() {
        const {bookcase, onUpdateBookcase} = this.props

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {
                        Object.keys(bookcase).map((shelf) => (
                            <div key={bookcase[shelf].bookshelfTitle}>
                                <Bookshelf
                                    bookshelfTitle={bookcase[shelf].bookshelfTitle}
                                    books={bookcase[shelf].books}
                                    bookcase={bookcase}
                                    onUpdateBookcase={onUpdateBookcase}
                                />
                            </div>
                        ))
                    }
                </div>
                <div className="open-search">
                    <Link to="/Search">Add a Book </Link>
                </div>
            </div>
        )
    }
}

export default Bookcase