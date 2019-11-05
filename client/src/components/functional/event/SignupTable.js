import React from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default function SignupTable({signups}) {
    const columns = [
      {
        id: "name",
        Header: "Name",
        accessor: c => c.character.name,
      },
      {
        Header: 'Status',
        accessor: "status"
      },
    ]

    return (
      <ReactTable
        data={signups}
        columns={columns}
        defaultSorted={[
          {
            id: "status",
            desc: true
          },
          {
            id: "name",
            asc: true
          }
        ]}
        defaultPageSize={10}
      />
    )
  }