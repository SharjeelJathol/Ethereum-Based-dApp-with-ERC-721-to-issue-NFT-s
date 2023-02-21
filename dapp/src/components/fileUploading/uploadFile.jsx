import React from 'react'
import axios from 'axios';
export default function uploadFile() {
    let upload=e=>{
        let formdata=new FormData();
        formdata.append('uploaded_file', e.target.files[0], e.target.files[0].name);
        formdata.append('check', 'test')
        axios({
            method: "post",
            url: "http://localhost:5000/form",
            data: formdata,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
        //handle success
        console.log(response);
        })
        .catch(function (response) {
        //handle error
        console.log(response);
        });

    }
  return (
    <div>uploadFile</div>
  )
}
