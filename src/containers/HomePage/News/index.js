import React, { Component } from 'react';
import cn from 'classnames';

import NewsItem from './NewsItem';

import styles from './News.module.scss';

export default class News extends Component {
    render() {
        let {
            news = [{
                title: "title1",
                thumbnail: "https://via.placeholder.com/468x400",
                description: "Assumenda eius dolores harum modi veritatis suscipit. Reiciendis corrupti quis et et temporibus ducimus eius officiis assumenda. Atque eos placeat.",
                date: '20/11/2018'
            }, {
                title: "title2",
                thumbnail: "https://via.placeholder.com/468x300",
                description: "Beatae eum eos rerum est et impedit. Aut dolorem nemo ab dignissimos sed. Non voluptatem rerum aut eum architecto. Labore dignissimos officia aut harum vel voluptatum. Qui a ipsum quo magni quam minima modi. Perferendis assumenda cum dolore ut explicabo repellendus molestiae quo."
            }, {
                title: "title1",
                thumbnail: "https://via.placeholder.com/468x500",
                description: "Assumenda eius dolores harum modi veritatis suscipit. Reiciendis corrupti quis et et temporibus ducimus eius officiis assumenda. Atque eos placeat."
            }, {
                title: "title2",
                thumbnail: "https://via.placeholder.com/468x400",
                description: "Beatae eum eos rerum est et impedit. Aut dolorem nemo ab dignissimos sed. Non voluptatem rerum aut eum architecto. Labore dignissimos officia aut harum vel voluptatum. Qui a ipsum quo magni quam minima modi. Perferendis assumenda cum dolore ut explicabo repellendus molestiae quo."
            }, {
                title: "title1",
                thumbnail: "https://via.placeholder.com/468x300",
                description: "Assumenda eius dolores harum modi veritatis suscipit. Reiciendis corrupti quis et et temporibus ducimus eius officiis assumenda. Atque eos placeat."
            }, {
                title: "title2",
                thumbnail: "https://via.placeholder.com/468x400",
                description: "Beatae eum eos rerum est et impedit. Aut dolorem nemo ab dignissimos sed. Non voluptatem rerum aut eum architecto. Labore dignissimos officia aut harum vel voluptatum. Qui a ipsum quo magni quam minima modi. Perferendis assumenda cum dolore ut explicabo repellendus molestiae quo."
            }]
        } = this.props;

        return (
            <section className={cn(styles.main)}>
                <h1 className="text-center me-title text-muted">Tin Tức</h1>
                <div className="container">
                    <div className="row">
                        {news.map((item, index) => {
                            return (
                                <div key={index} className="col-12 col-sm-6 col-md-4">
                                    <NewsItem {...item}/>
                                </div>
                            );
                        })}
                        </div>
                </div>
            </section>
        )
    }
}