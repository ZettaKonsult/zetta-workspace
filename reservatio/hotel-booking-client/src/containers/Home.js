import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap'
import { invokeApig } from '../libs/awslib'
import { getAll } from '../libs/apiDatabase'
import { Link } from 'react-router-dom'
import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      rooms: []
    }
  }

  async componentDidMount() {
    if (this.props.userToken === null) {
      return
    }

    this.setState({ isLoading: true })

    try {
      const results = await getAll(this.props.userToken)
      const sortedResults = [...results].sort(this.compareRoomId)

      this.setState({ rooms: sortedResults })
    } catch (e) {
      console.log(e)
    }

    this.setState({ isLoading: false })
  }

  compareRoomId = (a, b) => Number(a.roomId) > Number(b.roomId)

  renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0 ? (
          <ListGroupItem
            key={note.roomId}
            href={`/rooms/reserve/${note.roomId}`}
            onClick={this.handleNoteClick}
            header={note.roomId.trim().split('\n')[0]}>
            {'Created: ' + new Date(note.createdAt).toLocaleString()}
          </ListGroupItem>
        ) : (
          <ListGroupItem
            key="new"
            href="/rooms/new"
            onClick={this.handleNoteClick}>
            <h4>
              <b>{'\uFF0B'}</b> Create a new room
            </h4>
          </ListGroupItem>
        )
    )
  }

  handleNoteClick = event => {
    event.preventDefault()
    this.props.history.push(event.currentTarget.getAttribute('href'))
  }

  renderLander = () => (
    <div className="lander">
      <h1>Reservatio</h1>
      <p>A simple booking app</p>
      <div>
        <Link to="/login" className="btn btn-info btn-lg">
          Login
        </Link>
      </div>
    </div>
  )

  renderNotes = () => (
    <div className="notes">
      <PageHeader>Your Rooms</PageHeader>
      <ListGroup>
        {!this.state.isLoading && this.renderNotesList(this.state.rooms)}
      </ListGroup>
    </div>
  )

  render() {
    return (
      <div className="Home">
        {this.props.userToken === null
          ? this.renderLander()
          : this.renderNotes()}
      </div>
    )
  }
}

export default withRouter(Home)
