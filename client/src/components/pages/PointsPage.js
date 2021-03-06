import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getCharacters } from '../../actions/charActions';

import NavigationBar from '../functional/NavigationBar';
import FileUpload from '../functional/FileUpload';

import ReactTable from 'react-table'
import 'react-table/react-table.css'

class PointsPage extends Component {
  componentDidMount() {
    !this.props.token && this.props.history.push(`/`);
    this.props.getCharacters(this.props.token);
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
            defaultSorted={[
              {
                id: "priority",
                desc: true
              },
              {
                id: "name",
                asc: true
              }
            ]}
            defaultPageSize={10}
          />
        {
          user.role === 'admin' &&
          <FileUpload 
            title="From CSV"
            url="/api/character/import"
          />
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
  token: state.user.token,
  characters: state.character.characters
});

export default connect(mapStateToProps,{getCharacters})(PointsPage);