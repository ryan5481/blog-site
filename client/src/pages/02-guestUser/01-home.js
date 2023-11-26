import React, { useState, useEffect } from 'react'
import Carousel from "../../components/animations/carousel"
import { useSelector } from 'react-redux'
import axios from 'axios'
import ArticlesGrid from '../../components/grids/articlesGrid'

const baseUrl = process.env.REACT_APP_BASE_URL


const Home = () => {
    const [articlesList, setArticlesList] = useState([])

    const fetchArticles = async() => {
        const res = await axios.get(`${baseUrl}/get-articles`)
        const data = res.data.data;
        setArticlesList(data.reverse());
    }

    // console.log(articlesList)

    useEffect(() => {
        fetchArticles()
    }, [])

    return(
        <>
        <Carousel />
        <ArticlesGrid data={articlesList} />
        </>
    )
}

export default Home