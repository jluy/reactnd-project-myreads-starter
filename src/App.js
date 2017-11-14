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
      this.initForDev()
  }

  initForDev(){
      BooksAPI.get("nggnmAEACAAJ").then(book => this.updateBookcase(book, "read"))
      BooksAPI.get("sJf1vQAACAAJ").then(book => this.updateBookcase(book, "currentlyReading"))
      BooksAPI.get("evuwdDLfAyYC").then(book => this.updateBookcase(book, "wantToRead"))
      BooksAPI.get("74XNzF_al3MC").then(book => this.updateBookcase(book, "currentlyReading"))
      BooksAPI.get("jAUODAAAQBAJ").then(book => this.updateBookcase(book, "currentlyReading"))
      BooksAPI.get("IOejDAAAQBAJ").then(book => this.updateBookcase(book, "currentlyReading"))
      BooksAPI.get("1wy49i-gQjIC").then(book => this.updateBookcase(book, "read"))
  }

  syncBookcaseWithRemote() {
      BooksAPI.getAll().then(
          remoteBooks => {
              const myBookcase = this.createEmptyBookcase()
              remoteBooks.map( book => {
                  const myBook = this.createLocalBookObject(book)
                  myBookcase[book.shelf].books.push(myBook)
                  return myBook
              })
              this.setState({bookcase : myBookcase})
          }
      )
  }

  createEmptyBookcase() {
      return (
          {
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
      )
  }

  createLocalBookObject = (book) => {
      return (
          {
              "title": book.title,
              "authors": book.authors,
              "cover_location": book.imageLinks.thumbnail,
              "id": book.id,
              "shelfLocation": book.shelf
          }
      )
  }

  updateBookcase = (book, shelfName) => {
      BooksAPI.update(book, shelfName).then(()=>this.syncBookcaseWithRemote())
  }

  render() {
      const {bookcase} = this.state
      // console.log("DBSession", BooksAPI.getDBSessionId)
      // console.log("STATE: ", bookcase)
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
                                      books={bookcase[shelf].books}
                                      bookcase={bookcase}
                                      onUpdateBookcase={this.updateBookcase}
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
