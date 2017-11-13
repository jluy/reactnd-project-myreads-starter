import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        cover_location: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.string.isRequired,
        cover_width: PropTypes.number,
        cover_height: PropTypes.number,
        bookcase: PropTypes.object.isRequired,
        bookshelf: PropTypes.string.isRequired
    }

    render() {
        const { cover_location, title, authors, cover_width, cover_height, bookcase, bookshelf} = this.props
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={{ width: cover_width || 128, height: cover_height || 192, backgroundImage: `url(" ${cover_location}"`}}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={bookshelf}>
                                <option value="none" disabled>Move to...</option>
                                {
                                    Object.keys(bookcase).map(shelf => (
                                        <option key={shelf} value={shelf}>{bookcase[shelf].bookshelfTitle} </option>
                                        )
                                    )
                                }
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors}</div>
                </div>
            </li>
        )
    }
}

export default Book