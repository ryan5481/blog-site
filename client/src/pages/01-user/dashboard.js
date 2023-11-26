import React, { useState, useEffect } from 'react'
import ArticlesGrid from "../../components/grids/articlesGrid"
import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL


const Dashboard = () => {
    const [articlesList, setArticlesList] = useState([])

    const fetchArticles = async() => {
        const res = await axios.get(`${baseUrl}/get-articles`)
        const data = res.data.data;
        setArticlesList(data.reverse());
    }

    useEffect(() => {
        fetchArticles()
    }, [])
    return(
        <>
        <ArticlesGrid data={articlesList} />
        </>
    )
}

export default Dashboard
