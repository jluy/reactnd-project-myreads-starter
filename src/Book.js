import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        bookcase: PropTypes.object.isRequired,
        bookInfo: PropTypes.object.isRequired,
        onUpdateBookcase: PropTypes.func.isRequired
    }

    render() {
        const {
            bookInfo,
            bookcase,
            onUpdateBookcase
        } = this.props
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={{width: 128,height: 192,backgroundImage:`url(" ${bookInfo.cover_location}"`}}>
                        </div>
                        <div className="book-shelf-changer">
                            <select
                                value={bookInfo.shelfLocation}
                                onChange={ (e) => onUpdateBookcase(bookInfo, e.target.value)}
                            >
                                <option value="none" disabled>Move to...</option>
                                {
                                    Object.keys(bookcase).map(shelf => (
                                        <option
                                            key={shelf}
                                            value={shelf}
                                        >{bookcase[shelf].bookshelfTitle} </option>
                                        )
                                    )
                                }
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{bookInfo.title}</div>
                    <div className="book-authors">{bookInfo.authors.join(', ')}</div>
                </div>
            </li>
        )
    }
}

export default Book