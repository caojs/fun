import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import PageHeader from '../../components/PageHeader';
import NewsItem from '../HomePage/NewsItem';
import { getP, uqSelector } from '../../redux/usequest';
import styles from './PostsPage.module.scss';

const WHERE_LIST = 'PostsPage-List';
const getPosts = getP(WHERE_LIST);

const WHERE_COUNT = 'PostsPage-Count';
const getPostCount = getP(WHERE_COUNT);

const LIMIT = 10;

class PostsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0
        };

        this.onPageChange = this.onPageChange.bind(this);
    }

    getPosts() {
        return this.props.getPosts('/posts', {
            params: {
                _start:this.state.page * LIMIT,
                _limit: LIMIT
            }
        })
    }
    
    getPostCount() {
        return this.props.getPostCount('/posts/count');
    }

    onPageChange({ selected }) {
        this.setState({ page: selected });
    }

    componentDidMount() {
        this.getPosts();
        this.getPostCount();
    }

    componentDidUpdate(props, state) {
        if (this.state.page !== state.page) this.getPosts();
    }

    render() {
        const {
            count,
            posts
        } = this.props;

        if (!posts || !count) return null;

        if (posts.error || count.error) return null;

        const { loading, data: postList } = posts;

        const totalPage = Math.ceil(count.data/LIMIT);

        const { page } = this.state;

        return (
            <div className={styles.main}>
                <div className="container">
                    <PageHeader title="News"/>
                    <section className="me-content-section">
                        {postList && postList.map(item => (
                            <div key={item.id} className="me-item">
                                <NewsItem {...item}/>
                            </div>
                        ))}
                    </section>
                    {totalPage > 1 ?
                        <section className="me-pagination">
                            <ReactPaginate
                                previousLabel={<FiChevronLeft/>}
                                nextLabel={<FiChevronRight/>}
                                breakLabel={"..."}
                                initialPage={page}
                                pageCount={totalPage}
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
                        </section> : null}
                </div>
           </div>
        )
    }
}

export default connect(
    state => ({
        posts: uqSelector(WHERE_LIST, state),
        count: uqSelector(WHERE_COUNT, state)
    }),
    {
        getPosts,
        getPostCount
    }
)(PostsPage);