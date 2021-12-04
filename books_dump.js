const { Sequelize} = require('sequelize');
const fs = require('fs');
const readline = require('readline');
const {sequelize, Book} = require('./models');
const { once } = require('events');


sequelize.authenticate()
    .then(()=> console.log('database connected'))
    .catch(err => console.log(err))

    
try{
    (async function processLine(){
    try {
    const rl = readline.createInterface({
        input: fs.createReadStream(__dirname + '/BX-Books.csv'),
        crlfDelay: Infinity
    });
    let batch = [];
    rl.on('line', (line)=>{
        const row = line.split('";"');
        // console.log(row)

        // const book = {
        // isbn: row[0].substring(1,row[0].length-1),
        // book_title: row[1].substring(1,row[1].length-1),
        // book_author: row[2].substring(1,row[2].length-1),
        // year_of_publication: row[3].substring(1,row[3].length-1),
        // publisher: row[4].substring(1,row[4].length-1),
        // image_url_s: row[5].substring(1,row[5].length-1),
        // image_url_m: row[6].substring(1,row[6].length-1),
        // image_url_l: row[7].substring(1,row[7].length-1)
        // };


        // for BX-Books.csv
        const book = {
            isbn: row[0].substring(1,row[0].length),
            book_title: row[1],
            book_author: row[2],
            year_of_publication: row[3],
            publisher: row[4],
            image_url_l: row[7]
            };

        // for dataset.csv
        // const book = {
        //     isbn: row[1].substring(1,row[1].length),
        //     rating: row[2],
        //     book_title: row[3],
        //     book_author: row[4],
        //     year_of_publication: row[5],
        //     publisher: row[6],
        //     image_url_l: row[7],
        //     summary: row[8].substring(1,row[8].length),
        //     language: row[9],
        //     category: row[10].substring(2,row[10].length-1)
        // }

    // console.log(price)
    batch.push(book);
    if ( batch.length > 5000){
        const tempBatch = [...batch];
        batch=[];
        Book.bulkCreate(tempBatch)
        .then(()=>{
            console.log('data inserted to database successfully')
        })
        .catch(error =>{
            console.log(error);
        });
        batch.length = 0;
    }
    });
    await once(rl, 'close');
    Book.bulkCreate(batch)
    .then(() =>{
        console.log('successfully inserted the last bit of data');
        batch = [];
    })
    .catch(error =>{
        console.log(error);
    });
    console.log('file processed.');
    } 
    catch(error){
        console.log(error);
    }
    })();

}
catch (error){
    console.log(error);
}