import React from 'react';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default function FileUpload({title, url}) {
    const [file, setFile] = React.useState(null);
    const token = useSelector(state => state.user.token);

    return (
        <Col>
            <Col>
               <label>{title}</label>
            </Col>
            <Col>
                <input type="file" name="file" onChange={event => {
                    setFile(event.target.files[0]);
                }}/>
                <Button variant="dark" onClick={() => {
                    const data = new FormData();
                    data.append('file', file);
                    
                    fetch(url, {
                        method: 'POST',
                        body: data,
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    })
                    .then(res => res.json())
                    .then(message => console.log(message))
                    .catch(e => console.log(e))
                }}>upload</Button>
            </Col>
        </Col>
    )
  }