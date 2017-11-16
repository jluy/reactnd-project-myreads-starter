import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Book from './Book'

class Search extends Component {
    static propTypes = {
        onUpdateBookcase: PropTypes.func.isRequired,
        bookcase: PropTypes.object.isRequired,
        searchCatalog: PropTypes.func.isRequired,
        searchResult: PropTypes.array.isRequired,
        query: PropTypes.string.isRequired
    }

    render() {
        const {bookcase, onUpdateBookcase, searchCatalog, searchResult, query} = this.props

        // console.log("Bookcase", books.filter((element) => element.id === "74XNzF_al3MC"))
        // console.log("Search Results", searchResult)


        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => searchCatalog(event.target.value)}
                            value={query}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid" disabled={!query}>
                        {searchResult.map((book) =>
                            <Book
                                book={book}
                                key={book.id}
                                bookcase={bookcase}
                                onUpdateBookcase={onUpdateBookcase}
                            />
                        )}
                    </ol>

                </div>
            </div>
        )
    }
}

export default Search