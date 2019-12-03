const request = require('request');
const cheerio = require('cheerio');
const mongoose = require("mongoose");
const Homestay = require("../models/homestay");

exports.crawl_data = (req, res, next) => {
    let startUrl = "https://www.homestay.com/vietnam";
    let nextUrl = "https://www.homestay.com/homestays/search?accept_couples=0&accept_families=0&accept_female=0&accept_male=0&accept_students=0&bikes=0&check_in=&check_out=&cooking=0&country_code=VN&cycling=0&garden=0&golf=0&google_place_id=&guests=1&gym=0&hiking=0&latitude=15.9742&localised_content=true&location=Vietnam&location_id=&longitude=107.868&max_price=&meals_provided=0&min_price=&ne_lat=23.710274&ne_lng=109.68337&no_pets=0&order=&page=2&parking=0&price_bracket=&price_filter_currency=VND&price_filter_nights=1&radius=&search_type=search_box&self_catering=0&sw_lat=8.2122112&sw_lng=103.27355&swimming_pool=0&tennis=0&tv=0&type=&utf8=%E2%9C%93&wifi=0";
    let pageUrl3 = "https://www.homestay.com/homestays/search?accept_couples=0&accept_families=0&accept_female=0&accept_male=0&accept_students=0&bikes=0&check_in=&check_out=&cooking=0&country_code=VN&cycling=0&garden=0&golf=0&google_place_id=&guests=1&gym=0&hiking=0&latitude=15.9742&localised_content=true&location=Vietnam&location_id=&longitude=107.868&max_price=&meals_provided=0&min_price=&ne_lat=23.710274&ne_lng=109.68337&no_pets=0&order=&page=3&parking=0&price_bracket=&price_filter_currency=VND&price_filter_nights=1&radius=&search_type=search_box&self_catering=0&sw_lat=8.2122112&sw_lng=103.27355&swimming_pool=0&tennis=0&tv=0&type=&utf8=%E2%9C%93&wifi=0";
    let pageUrl4 = "https://www.homestay.com/homestays/search?accept_couples=0&accept_families=0&accept_female=0&accept_male=0&accept_students=0&bikes=0&check_in=&check_out=&cooking=0&country_code=VN&cycling=0&garden=0&golf=0&google_place_id=&guests=1&gym=0&hiking=0&latitude=15.9742&localised_content=true&location=Vietnam&location_id=&longitude=107.868&max_price=&meals_provided=0&min_price=&ne_lat=23.710274&ne_lng=109.68337&no_pets=0&order=&page=4&parking=0&price_bracket=&price_filter_currency=VND&price_filter_nights=1&radius=&search_type=search_box&self_catering=0&sw_lat=8.2122112&sw_lng=103.27355&swimming_pool=0&tennis=0&tv=0&type=&utf8=%E2%9C%93&wifi=0";
    let pageUrl5 = "https://www.homestay.com/homestays/search?accept_couples=0&accept_families=0&accept_female=0&accept_male=0&accept_students=0&bikes=0&check_in=&check_out=&cooking=0&country_code=VN&cycling=0&garden=0&golf=0&google_place_id=&guests=1&gym=0&hiking=0&latitude=15.9742&localised_content=true&location=Vietnam&location_id=&longitude=107.868&max_price=&meals_provided=0&min_price=&ne_lat=23.710274&ne_lng=109.68337&no_pets=0&order=&page=5&parking=0&price_bracket=&price_filter_currency=VND&price_filter_nights=1&radius=&search_type=search_box&self_catering=0&sw_lat=8.2122112&sw_lng=103.27355&swimming_pool=0&tennis=0&tv=0&type=&utf8=%E2%9C%93&wifi=0";
    let pageUrl6 = "https://www.homestay.com/homestays/search?accept_couples=0&accept_families=0&accept_female=0&accept_male=0&accept_students=0&bikes=0&check_in=&check_out=&cooking=0&country_code=VN&cycling=0&garden=0&golf=0&google_place_id=&guests=1&gym=0&hiking=0&latitude=15.9742&localised_content=true&location=Vietnam&location_id=&longitude=107.868&max_price=&meals_provided=0&min_price=&ne_lat=23.710274&ne_lng=109.68337&no_pets=0&order=&page=6&parking=0&price_bracket=&price_filter_currency=VND&price_filter_nights=1&radius=&search_type=search_box&self_catering=0&sw_lat=8.2122112&sw_lng=103.27355&swimming_pool=0&tennis=0&tv=0&type=&utf8=%E2%9C%93&wifi=0";
    let pageUrl7 = "https://www.homestay.com/homestays/search?accept_couples=0&accept_families=0&accept_female=0&accept_male=0&accept_students=0&bikes=0&check_in=&check_out=&cooking=0&country_code=VN&cycling=0&garden=0&golf=0&google_place_id=&guests=1&gym=0&hiking=0&latitude=15.9742&localised_content=true&location=Vietnam&location_id=&longitude=107.868&max_price=&meals_provided=0&min_price=&ne_lat=23.710274&ne_lng=109.68337&no_pets=0&order=&page=7&parking=0&price_bracket=&price_filter_currency=VND&price_filter_nights=1&radius=&search_type=search_box&self_catering=0&sw_lat=8.2122112&sw_lng=103.27355&swimming_pool=0&tennis=0&tv=0&type=&utf8=%E2%9C%93&wifi=0";
    let pageUrl8 = "https://www.homestay.com/homestays/search?accept_couples=0&accept_families=0&accept_female=0&accept_male=0&accept_students=0&bikes=0&check_in=&check_out=&cooking=0&country_code=VN&cycling=0&garden=0&golf=0&google_place_id=&guests=1&gym=0&hiking=0&latitude=15.9742&localised_content=true&location=Vietnam&location_id=&longitude=107.868&max_price=&meals_provided=0&min_price=&ne_lat=23.710274&ne_lng=109.68337&no_pets=0&order=&page=8&parking=0&price_bracket=&price_filter_currency=VND&price_filter_nights=1&radius=&search_type=search_box&self_catering=0&sw_lat=8.2122112&sw_lng=103.27355&swimming_pool=0&tennis=0&tv=0&type=&utf8=%E2%9C%93&wifi=0";
    let pageUrl9 = "https://www.homestay.com/homestays/search?accept_couples=0&accept_families=0&accept_female=0&accept_male=0&accept_students=0&bikes=0&check_in=&check_out=&cooking=0&country_code=VN&cycling=0&garden=0&golf=0&google_place_id=&guests=1&gym=0&hiking=0&latitude=15.9742&localised_content=true&location=Vietnam&location_id=&longitude=107.868&max_price=&meals_provided=0&min_price=&ne_lat=23.710274&ne_lng=109.68337&no_pets=0&order=&page=9&parking=0&price_bracket=&price_filter_currency=VND&price_filter_nights=1&radius=&search_type=search_box&self_catering=0&sw_lat=8.2122112&sw_lng=103.27355&swimming_pool=0&tennis=0&tv=0&type=&utf8=%E2%9C%93&wifi=0";
    let pageUrl10 = "https://www.homestay.com/homestays/search?accept_couples=0&accept_families=0&accept_female=0&accept_male=0&accept_students=0&bikes=0&check_in=&check_out=&cooking=0&country_code=VN&cycling=0&garden=0&golf=0&google_place_id=&guests=1&gym=0&hiking=0&latitude=15.9742&localised_content=true&location=Vietnam&location_id=&longitude=107.868&max_price=&meals_provided=0&min_price=&ne_lat=23.710274&ne_lng=109.68337&no_pets=0&order=&page=10&parking=0&price_bracket=&price_filter_currency=VND&price_filter_nights=1&radius=&search_type=search_box&self_catering=0&sw_lat=8.2122112&sw_lng=103.27355&swimming_pool=0&tennis=0&tv=0&type=&utf8=%E2%9C%93&wifi=0";
    let pageUrl11 = "https://www.homestay.com/homestays/search?accept_couples=0&accept_families=0&accept_female=0&accept_male=0&accept_students=0&bikes=0&check_in=&check_out=&cooking=0&country_code=VN&cycling=0&garden=0&golf=0&google_place_id=&guests=1&gym=0&hiking=0&latitude=15.9742&localised_content=true&location=Vietnam&location_id=&longitude=107.868&max_price=&meals_provided=0&min_price=&ne_lat=23.710274&ne_lng=109.68337&no_pets=0&order=&page=11&parking=0&price_bracket=&price_filter_currency=VND&price_filter_nights=1&radius=&search_type=search_box&self_catering=0&sw_lat=8.2122112&sw_lng=103.27355&swimming_pool=0&tennis=0&tv=0&type=&utf8=%E2%9C%93&wifi=0";
    let pageUrl12 = "https://www.homestay.com/homestays/search?accept_couples=0&accept_families=0&accept_female=0&accept_male=0&accept_students=0&bikes=0&check_in=&check_out=&cooking=0&country_code=VN&cycling=0&garden=0&golf=0&google_place_id=&guests=1&gym=0&hiking=0&latitude=15.9742&localised_content=true&location=Vietnam&location_id=&longitude=107.868&max_price=&meals_provided=0&min_price=&ne_lat=23.710274&ne_lng=109.68337&no_pets=0&order=&page=12&parking=0&price_bracket=&price_filter_currency=VND&price_filter_nights=1&radius=&search_type=search_box&self_catering=0&sw_lat=8.2122112&sw_lng=103.27355&swimming_pool=0&tennis=0&tv=0&type=&utf8=%E2%9C%93&wifi=0";
    let pageUrl13 = "https://www.homestay.com/homestays/search?accept_couples=0&accept_families=0&accept_female=0&accept_male=0&accept_students=0&bikes=0&check_in=&check_out=&cooking=0&country_code=VN&cycling=0&garden=0&golf=0&google_place_id=&guests=1&gym=0&hiking=0&latitude=15.9742&localised_content=true&location=Vietnam&location_id=&longitude=107.868&max_price=&meals_provided=0&min_price=&ne_lat=23.710274&ne_lng=109.68337&no_pets=0&order=&page=13&parking=0&price_bracket=&price_filter_currency=VND&price_filter_nights=1&radius=&search_type=search_box&self_catering=0&sw_lat=8.2122112&sw_lng=103.27355&swimming_pool=0&tennis=0&tv=0&type=&utf8=%E2%9C%93&wifi=0";
    let pageUrl14 = "https://www.homestay.com/homestays/search?accept_couples=0&accept_families=0&accept_female=0&accept_male=0&accept_students=0&bikes=0&check_in=&check_out=&cooking=0&country_code=VN&cycling=0&garden=0&golf=0&google_place_id=&guests=1&gym=0&hiking=0&latitude=15.9742&localised_content=true&location=Vietnam&location_id=&longitude=107.868&max_price=&meals_provided=0&min_price=&ne_lat=23.710274&ne_lng=109.68337&no_pets=0&order=&page=14&parking=0&price_bracket=&price_filter_currency=VND&price_filter_nights=1&radius=&search_type=search_box&self_catering=0&sw_lat=8.2122112&sw_lng=103.27355&swimming_pool=0&tennis=0&tv=0&type=&utf8=%E2%9C%93&wifi=0";

    let urls = [
        { url: startUrl },
        { url: nextUrl },
        { url: pageUrl3 },
        { url: pageUrl4 },
        { url: pageUrl5 },
        { url: pageUrl6 },
        { url: pageUrl7 },
        { url: pageUrl8 },
        { url: pageUrl9 },
        { url: pageUrl10 },
        { url: pageUrl11 },
        { url: pageUrl12 },
        { url: pageUrl13 },
        { url: pageUrl14 }
    ];

    const promise = urls.map((item, index) => {
        let urlEncode = item['url'];
        let p = new Promise((resolve, reject) => {
            request(urlEncode, (err, response, body) => {
                //console.log('url param', urlEncode);
                if (err) {
                    console.log(err);
                    let result = {
                        'status': 400, // bad request
                        'data': []
                    };
                    console.log('fail ', err);
                    reject(result);
                }
                else if (response.statusCode !== 200) {
                    let result = {
                        'status': response.statusCode,
                        'data': []
                    };
                    console.log('fail ', response.statusCode);
                    reject(result);
                }
                else {
                    const data = cheerio.load(body);

                    const result = [];
                    // $('.football-matches__day').toArray().map(matchesDay => {
                    data('#homestays > li > a').toArray().map(element => {
                        let url = 'https://www.homestay.com' + data(element).attr('href');

                        request(url, function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                const $ = cheerio.load(body);

                                let title = $('h4.homestay-title').text();
                                let price = $('h5 > a > span.value').text();
                                let url_image = $('div.background-image'); // not good
                                let description = $('#main-content-col-margin > div.homestay-information > div:nth-child(1) > div > p').text();
                                let lat = $('div.map.tab-pane.active').attr('data-lat');
                                let lng = $('div.map.tab-pane.active').attr('data-lng');
                                let review_score = $('div.review-score > meta').attr('content');
                                let arr = $('span.label.label-info-inverted');
                                let about_homestay = [];
                                arr.each(function () {
                                    about_homestay.push($(this).text());
                                });
                                let address = $('div.catchphrase > h5').text();
                                //get infor host

                                let house_facilities = [];
                                let arr_facilities = $('div.col-xs-12').find('div.col-xs-6.col-sm-4.col-md-3 > li > span');
                                arr_facilities.each(function () {
                                    house_facilities.push($(this).text());
                                });

                                let available_for = [];
                                let arr_available = $('div.col-xs-12 > ul.list-unstyled.tick-list.list-inline > li');
                                arr_available.each(function () {
                                    available_for.push($(this).text());
                                })

                                let area_facilities = [];
                                let arr_area_facilities = $('div.homestay-location.spacer-triple').find('li.small > span');
                                arr_area_facilities.each(function () {
                                    area_facilities.push($(this).text());
                                })

                                let meals = $('div.homestay-meals.spacer-triple').find('p').text();
                                let house_rules = $('div.homestay-rules').find('p').text();
                                let image_map = $('div.map-block').find('img').attr('src');
                                let num_reviews = $('div.homestay-reviews.spacer-triple > h2').text();
                                //get review list
                                let arr_reviews = $('li.review-list-item');
                                let list_reviews = [];
                                arr_reviews.each(function () {
                                    let date = $(this).find('h5.text-gray.review-date').text();
                                    let country = $(this).find('div.review-author-info > p.small.text-gray > span').text();
                                    let avatar = $(this).find('div.review-author > div.rounded-picture.medium.small-xs.review-author-avatar > a > img').attr("src");
                                    let score = $(this).find('div.review-score-container.small-review-score-container > div.review-score > meta').attr("content");
                                    let name = $(this).find('div.review-author-info > div.review-author-name.spacer-half.spacer-0-xs').attr("content");
                                    let content = $(this).find('div.review-text > p').text();
                                    let review = {
                                        date: date,
                                        country: country,
                                        name: name,
                                        avatar: avatar,
                                        score: score,
                                        content, content
                                    }
                                    list_reviews.push(review);
                                })
                                let image_gallery = $('div.gallery > div.ninja-slider > ul > li > div').attr('data-image');
                                let about_area = $('div.homestay-location.spacer-triple > div.row > div.col-md-8 >p').text();
                                console.log(address);
                                // let homestay = {
                                //     title: title,
                                //     description: description,
                                //     price: price,
                                //     lat: lat,
                                //     lng: lng,
                                //     about_homestay: about_homestay,
                                //     num_reviews: num_reviews,
                                //     review_score: review_score,
                                //     image: image_gallery,
                                //     url: url
                                // };
                                const homestay = new Homestay({
                                    _id: new mongoose.Types.ObjectId(),
                                    name: title,
                                    description: description,
                                    url: url,
                                    price: price,
                                    lat: lat,
                                    lng: lng,
                                    num_reviews: list_reviews.length,
                                    review_score: review_score,
                                    image_center: image_gallery,
                                    about: about_homestay,
                                    list_review: list_reviews,
                                    address: address,
                                    house_facilities: house_facilities,
                                    house_rules: house_rules,
                                    available_for: available_for,
                                    image_map: image_map,
                                    meals: meals,
                                    area_facilities: area_facilities,
                                    about_area: about_area
                                });
                                homestay
                                    .save()
                                    .then(result => {
                                    });
                                // result.push(homestay); 
                            }
                        });
                    });
                    resolve(result);
                }
            });
        });
        return p;
    });

    Promise.all(promise)
        .then(repos => {
            let currentDate = new Date();
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();
            let hour = currentDate.getUTCHours();
            let fullday = hour + ':' + day + "/" + month + "/" + year;
            let thesecs = currentDate.getTime();
            let m = new Homestay({
                date: fullday,
                active: true,
                time: thesecs,
                data: repos[0]
            });
            m.save(err => {
                if (err) {
                    return;
                }
                //res({status : '200'});
            });
            res(m);
        })
        .catch(err => { res({ status: '404' }) });
}

exports.get_all = (req, res, next) => {

    Homestay.find()
        .select("name price review_score image_center _id lat lng")
        .sort({ review_score: "descending" })
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                homestays: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        review_score: doc.review_score,
                        image_center: doc.image_center,
                        lat: doc.lat,
                        lng: doc.lng
                    };

                })
            };
            //   if (docs.length >= 0) {
            res.status(200).json({
                code: 200,
                status: "Success",
                data: response
            });
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                code: 500,
                status: "Error",
                message: err
            });
        });
}

exports.get_top_spots = (req, res, next) => {
    Homestay.find({ review_score: 5.0 })
        .sort({ num_reviews: 'descending' })
        .limit(20)
        .select("_id name price review_score image_center")
        .exec((error, homestays) => {
            if (error) {
                res.status(500).json({
                    code: 500,
                    status: "Error",
                    message: error
                });
            }

            const data = {
                count: homestays.length,
                homestays: homestays
            };
            res.status(200).json({
                code: 200,
                status: "Success",
                data: data
            });
        });
}

exports.get_detail = (req, res, next) => {
    const id = req.params.homestayId;
    Homestay.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    code: 200,
                    status: "Success",
                    homestay: doc
                });
            } else {
                res
                    .status(404)
                    .json({
                        code: 404,
                        status: "Error",
                        message: "No valid entry found for provided ID"
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                code: 500,
                status: "Error",
                error: err
            });
        });
}

exports.search = (req, res, next) => {
    const keyword = req.body.keyword;
    Homestay.find({ name: { '$regex': keyword, '$options': 'i' } })
        .select("name price review_score image_center _id lat lng")
        .then(homestays => {
            console.log(homestays);
            res.status(200).json({
                code: 200,
                status: "Success",
                data: homestays
            });
        })
        .catch(e => console.log(e));
}


exports.base_content_recommendation = (req, res, next) => {
    const idHomeStay = req.body.idHomestay;
    const itemProfile = req.body.itemProfile;
    console.log("input" + idHomeStay + itemProfile);
    const ContentBasedRecommender = require('content-based-recommender');
    const recommender = new ContentBasedRecommender({
        minScore: 0.1,
        maxSimilarDocuments: 100
    });

    // prepare documents data
    Homestay.find()
        .sort({ review_score: 'descending' })
        .select("_id address house_facilities")
        .exec((error, homestays) => {
            if (error) {
                res.status(500).json({
                    code: 500,
                    status: "Error",
                    message: error
                });
            }

            const documents = [];
            homestays.forEach(element => {
                documents.push({
                    id: element._id,
                    content: element.address + " " + element.house_facilities + " "
                });
            });

            if (idHomeStay != null && idHomeStay.length > 0 && itemProfile == null) {
                // start training
                recommender.train(documents);
                //get top 10 similar items to document 1000002
                const similarDocuments = recommender.getSimilarDocuments(idHomeStay, 0, 10);
                res.json({
                    code: 200,
                    status: "Success",
                    data: similarDocuments
                });

            } else {
                const sample = {
                    id: "1000002_test",
                    content: itemProfile
                }
                documents.push(sample);
                console.log(documents);
                // start training
                recommender.train(documents);
                //get top 10 similar items to document 1000002_test
                const similarDocuments = recommender.getSimilarDocuments(sample.id, 0, 10);

                console.log(sample.id + " " + similarDocuments);
                res.json({
                    code: 200,
                    status: "Success",
                    data: similarDocuments
                });
            }
        });
}