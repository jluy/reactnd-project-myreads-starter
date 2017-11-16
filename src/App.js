import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookcase from './Bookcase'
import Search from "./Search";

class BooksApp extends React.Component {
    state = {
        bookcase: this.createEmptyBookcase(),
        searchResult: [],
        query: ''
    }

    componentDidMount() {
        this.syncBookcaseWithRemote()
    }

    searchCatalog = (query) => {
        BooksAPI.search(query, 100)
            .then(response => {
                console.log("Search Results", response)
                if (response == null || response.error) {
                    this.setState({searchResult: []})
                }
                else {
                    this.setState({searchResult: response})
                }
                this.setState({query: query})
            })
            .catch(
                (error) => {
                    this.setState({searchResult: []})
                    console.error("ERROR", error)
                })
    }

    initForDev() {
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
                remoteBooks.map(book => {
                    myBookcase[book.shelf].books.push(book)
                    return book
                })
                this.setState({bookcase: myBookcase})
            }
        )
    }

    createEmptyBookcase() {
        return (
            {
                "currentlyReading": {
                    "bookshelfTitle": "Currently Reading",
                    "books": []
                },
                "wantToRead": {
                    "bookshelfTitle": "Want to Read",
                    "books": []
                },
                "read": {
                    "bookshelfTitle": "Read",
                    "books": []
                }
            }
        )
    }

    updateBookcase = (book, shelfName) => {
        BooksAPI.update(book, shelfName).then(() => this.syncBookcaseWithRemote())
    }

    render() {
        const {bookcase, searchResult, query} = this.state
        // console.log("DBSession", BooksAPI.getDBSessionId)
        // console.log("STATE: ", bookcase)
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <Bookcase
                        bookcase={bookcase}
                        onUpdateBookcase={this.updateBookcase}/>
                )}/>
                <Route path="/search" render={() => (
                    <Search
                        bookcase={bookcase}
                        onUpdateBookcase={this.updateBookcase}
                        searchCatalog={this.searchCatalog}
                        searchResult={searchResult}
                        query={query}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp
