import React, { Component } from 'react';

class List extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('/api/user')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  render() {
    const { list } = this.state;

    return (
      <div className="App">
        <h1>List of users</h1>
        {list.length && (
          <div>
            {list.map((item) => {
              return(
                <div>
                  {item.name} {item.ep} {item.gp}
                  <input type="text" name={item.name} />
                  <button class="btn">
                      Update
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <h2>Add new user</h2>
        <input type="text" name="newuser" />
        <button class="btn">
            Add
        </button>
        <h2>Delete user</h2>
        <input type="text" name="removeuser" />
        <button class="btn">
            Remove
        </button>
      </div>
    );
  }
}

export default List;
