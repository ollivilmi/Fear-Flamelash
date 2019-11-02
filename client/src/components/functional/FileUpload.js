import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export default function FileUpload({title, url, token}) {
    const [file, setFile] = React.useState(null);

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
                    console.log(file);
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