const mongoose = require('mongoose');
const {Product} = require('../models/product');

const data = [
    { 
        title:'Doom', 
        image:'https://images-na.ssl-images-amazon.com/images/I/51qtbZX-yEL.jpg', 
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id pharetra nisl, id iaculis est. Donec sollicitudin, nunc in pulvinar fringilla, sapien mauris vehicula tellus, posuere auctor magna nisi eu magna. Quisque dignissim auctor enim ut tincidunt. Suspendisse nec gravida nisi. Nulla interdum est velit, et mattis tellus lobortis eu.',
        price:20
    },
    { 
        title:'Zelda', 
        image:'https://cdn.shopify.com/s/files/1/0630/8509/products/pst1131zelda_large.jpg?v=1498853612', 
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id pharetra nisl, id iaculis est. Donec sollicitudin, nunc in pulvinar fringilla, sapien mauris vehicula tellus, posuere auctor magna nisi eu magna. Quisque dignissim auctor enim ut tincidunt. Suspendisse nec gravida nisi. Nulla interdum est velit, et mattis tellus lobortis eu.',
        price:20
    },
    { 
        title:'Halo', 
        image:'https://images-na.ssl-images-amazon.com/images/I/51kYEwPSdVL.jpg', 
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id pharetra nisl, id iaculis est. Donec sollicitudin, nunc in pulvinar fringilla, sapien mauris vehicula tellus, posuere auctor magna nisi eu magna. Quisque dignissim auctor enim ut tincidunt. Suspendisse nec gravida nisi. Nulla interdum est velit, et mattis tellus lobortis eu.',
        price:20
    },
    { 
        title:'codmw3', 
        image:'https://imgc.allpostersimages.com/img/print/posters/call-of-duty-modern-warfare-3-video-game-poster_a-G-12925450-0.jpg', 
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id pharetra nisl, id iaculis est. Donec sollicitudin, nunc in pulvinar fringilla, sapien mauris vehicula tellus, posuere auctor magna nisi eu magna. Quisque dignissim auctor enim ut tincidunt. Suspendisse nec gravida nisi. Nulla interdum est velit, et mattis tellus lobortis eu.',
        price:20
    }
]

async function seed(){
    await Product.remove({},()=> console.log('Removed Products'));
        data.forEach(async function(product){
            await Product.create(product);
            console.log('product saved');
        });
}

module.exports = seed;