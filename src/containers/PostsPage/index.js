import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import NewsItem from '../HomePage/NewsItem';
import { getP, uqSelector } from '../../redux/usequest';
import styles from './PostsPage.module.scss';

const WHERE = 'PostsPage';
const getPosts = getP(WHERE);

class PostsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0
        };

        this.onPageChange = this.onPageChange.bind(this);
    }

    getPosts() {
        return this.props.getPosts('http://5bd3f794be3a0b0013d034d9.mockapi.io/api/v1/posts', {
            params: {
                page: this.state.page,
                limit: 10
            }
        })
    }

    onPageChange({ selected }) {
        this.setState({ page: selected });
    }

    componentDidMount() {
        this.getPosts();
    }

    componentDidUpdate(props, state) {
        if (this.state.page !== state.page) this.getPosts();
    }

    render() {
        const { posts } = this.props;

        if (!posts) return null;

        const {
            loading,
            error,
            data
        } = posts;

        if (error) return null;

        const { page } = this.state;

        return (
            <div className={styles.main}>
                <div className="container">
                    <section className="me-title-section">
                        <div className="text-center">
                            <h1>Tin Tức</h1>
                        </div>
                    </section>
                    <section className="me-content-section">
                        {data && data.map(item => (
                            <div key={item.id} className="me-item">
                                <NewsItem {...item}/>
                            </div>
                        ))}
                    </section>
                    <section className="me-pagination">
                        <ReactPaginate
                            previousLabel={<FiChevronLeft/>}
                            nextLabel={<FiChevronRight/>}
                            breakLabel={"..."}
                            initialPage={page}
                            pageCount={10}
                            marginPagesDisplayed={3}
                            pageRangeDisplayed={3}
                            disableInitialCallback={true}
                            onPageChange={this.onPageChange}
                            containerClassName="pagination"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName={"active"} />
                    </section>
                </div>
           </div>
        )
    }
}

export default connect(
    state => ({
        posts: uqSelector(WHERE, state)
    }),
    {
        getPosts
    }
)(PostsPage);