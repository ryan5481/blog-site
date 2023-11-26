const mongoose = require ("mongoose");

const articleSchema = ({

    author: {
        type: String,
    },
    
    tags: {
        type: Object,
    },
    
    heroImage: {
        type: String,
    },

    title: {
        type: String,
    },

    subTitle: {
        type: String,
    },

    heading1: {
        type: String,
    },

    // image1 :{
    //     type: String,
    // },

    text1: {
        type: String,
    },
    
    heading2: {
        type: String,
    },

    // image2:{
    //     type: String,
    // },

    text2: {
        type: String,
    },
    
    heading3: {
        type: String,
    },

    // image3 :{
    //     type: String,
    // },

    text3: {
        type: String,
    },
    
    heading4: {
        type: String,
    },

    // image4 :{
    //     type: String,
    // },

    text4: {
        type: String,
    },
    
    heading5: {
        type: String,
    },

    // image5 :{
    //     type: String,
    // },

    text5: {
        type: String,
    },
    
    createdAt: { type: Date, default: Date.now },
    
    updatedAt: { type: Date, default: Date.now },

})

const Article = mongoose.model("Article", articleSchema);

module.exports = Article