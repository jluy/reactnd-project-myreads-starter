import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
      bookcase: {
          "currentlyReading": {
              "bookshelfTitle" : "Currently Reading",
              "books": []
          },
          "wantToRead": {
              "bookshelfTitle" : "Want to Read",
              "books": []
          },
          "read": {
              "bookshelfTitle" : "Read",
              "books": []
          }
      }
  }

  componentDidMount(){
      this.syncBookcaseWithRemote()
  }

  syncBookcaseWithRemote(){
      BooksAPI.getAll().then(
          remoteBooks => {
              remoteBooks.map( book => {
                  const myBook = {
                      "title": book.title,
                      "authors": book.authors,
                      "cover_location": book.imageLinks.thumbnail
                  }
                  const myBookcase = this.state.bookcase
                  myBookcase[book.shelf].books.push(myBook)
                  this.setState({bookcase : myBookcase})
              })

          }
      )
  }

  updateBookcase(bookId, shelf){
      BooksAPI.update(bookId, shelf).then(
          // set the whole response into state
          remoteBookcase => {
              // For each shelf, get all the books
              Object.keys(remoteBookcase).map( (remoteShelf) => {
                  // For each book, get data
                  remoteBookcase[remoteShelf].map(book => BooksAPI.get(book).then(remoteBook => {
                      const myBook = {
                          "title": remoteBook.title,
                          "authors": remoteBook.authors,
                          "cover_location": remoteBook.imageLinks.thumbnail
                      }

                      // Add the book to this.state.bookcase
                      const myBookcase = this.state.bookcase
                      myBookcase[remoteShelf].books.push(myBook)
                      this.setState({bookcase : myBookcase})
                      }
                  ))
                  }
              )
          }
      )
  }




  render() {
      const {bookcase} = this.state
      return (
          <div className="app">
            <Route exact path="/" render={ () => (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                      {
                          Object.keys(bookcase).map( (shelf) => (
                              <div key={bookcase[shelf].bookshelfTitle} >
                                  <Bookshelf
                                      bookshelfTitle={bookcase[shelf].bookshelfTitle}
                                      bookshelf={shelf}
                                      books={bookcase[shelf].books}
                                      bookcase={bookcase}
                                  />
                              </div>
                          ))
                      }
                  </div>
                  <div className="open-search">
                    <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                  </div>
                </div>
            )}/>

            <Route path="/search" render={ () => (
                <div className="search-books">
                  <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                    <div className="search-books-input-wrapper">
                        {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                      <input type="text" placeholder="Search by title or author"/>
                    </div>
                  </div>
                  <div className="search-books-results">
                    <ol className="books-grid"></ol>
                  </div>
                </div>
            )}
            />
          </div>
    )
  }
}

export default BooksApp
