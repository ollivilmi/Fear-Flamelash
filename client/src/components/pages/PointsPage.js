import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getCharacters } from '../../actions/charActions';

import NavigationBar from '../functional/NavigationBar';
import Button from 'react-bootstrap/Button';

import ReactTable from 'react-table'
import 'react-table/react-table.css'

class PointsPage extends Component {
  componentDidMount() {
    this.props.getCharacters(this.props.user.token);
  }

  render() {
    const user = this.props.user.profile

    const columns = [
      {
        Header: 'Character',
        accessor: 'name'
      },
      {
        Header: "Class",
        accessor: 'class'
      },
      {
        Header: "Role",
        accessor: "role"
      },
      {
        Header: "Priority",
        accessor: "priority"
      }
    ]

    return (
      <>
        <NavigationBar/>
        <div>
          <ReactTable 
            data={this.props.characters}
            columns={columns}
          />
        {
          user.role === 'admin' && (
            <Button style={{marginTop: "1em"}} variant="dark">Import from CSV</Button>
          )
        }
        </div>
      </>
    );
  }
}

PointsPage.propTypes = {
  user: PropTypes.object.isRequired,
  characters: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  characters: state.character.characters
});

export default connect(mapStateToProps,{getCharacters})(PointsPage);