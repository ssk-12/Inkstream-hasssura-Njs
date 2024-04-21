import fetch from 'node-fetch';
import { gql } from 'graphql-request';
import axios from 'axios';

export async function fetchBlogs() {
    const query = gql`
        query GetBlogs {
            blogs {
                id
                title
                content
            }
        }
    `;

    const response = await axios.get("https://my-sample-project.hasura.app/api/rest/getpost",{
        headers:{
            "Content-Type": "application/json",
            "x-hasura-admin-secret": "8v90LNguD8W77N2K5UPrQ6lthYI6yHSnNlGc0dTD1Ak7YXldfpuYVU7aJWf6WTus"
        }
    })

    const jsond = await response.data;
    return jsond.Post;
}
