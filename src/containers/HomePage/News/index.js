import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { FaAngleRight } from 'react-icons/fa';

import { getP, uqSelector } from '../../../redux/usequest';
import NewsItem from '../NewsItem';

import styles from './News.module.scss';

const WHERE = 'HOMEPAGE/NEWS';
const getPosts = getP(WHERE);

class News extends Component {
    componentDidMount() {
        this.props.getPosts('http://5bd3f794be3a0b0013d034d9.mockapi.io/api/v1/posts');
    }

    render() {
        let { posts } = this.props;

        if (!posts || posts.loading) { return null; }

        let {
            error,
            data
        } = posts;

        data = (data || []).slice(0, 6);

        return (
            <section className={cn(styles.main)}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center me-header">
                        <h2 className="me-title m-0">Tin Tức</h2>
                        <Link className="d-flex align-items-center font-13 me-title-link" to="/news">
                            <span>See more</span>
                            <FaAngleRight/>
                        </Link>
                    </div>
                    <div className="me-list">
                        {data.map((item, index) => {
                            return (
                                <div key={index} className="me-item">
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

export default connect(
    state => ({ posts: uqSelector(WHERE, state) }),
    { getPosts }
)(News);