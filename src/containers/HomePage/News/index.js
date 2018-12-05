import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { getP, uqSelector } from '../../../redux/usequest';
import NewsItem from './NewsItem';

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
                <h1 className="text-center me-title text-muted">Tin Tức</h1>
                <div className="container">
                    <div className="row">
                        {data.map((item, index) => {
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

export default connect(
    state => ({ posts: uqSelector(WHERE, state) }),
    { getPosts }
)(News);