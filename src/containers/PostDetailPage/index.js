import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { get } from 'lodash-es';
import fecha from 'fecha';

import { getP, uqSelector } from '../../redux/usequest';
import { rootApi } from '../../configs/apiConfig';

import styles from './PostDetailPage.module.scss';

const WHERE = 'PostDetailPage';
const getPost = getP(WHERE);

class PostDetailPage extends Component {
    getId(match) {
        const slug = get(match, 'params.slug');
        if (slug) {
            return slug.split('.')[1];
        }
    }

    htmlDecode(input){
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

    componentDidMount() {
        const {
            match,
            getPost
        } = this.props;
        const id = this.getId(match);
        if (id) {
            getPost('/posts/' + id);
        }
    }

    render() {
        const { post } = this.props;
        if (!post || post.loading) return <div></div>;

        const { error, data } = post;

        if (error) return <div></div>

        const {
            id,
            title,
            description,
            content,
            image,
            created_at
        } = data;

        const createdDate = fecha.format(new Date(created_at), 'DD/MM/YYYY');
        const hasImage = !!image;

        return (
            <div className={styles.main}>
                <section className={cn("me-title-section", {
                    "has-image": hasImage
                })}>
                    <div className="container text-center">
                        <p className="text-muted me-date mb-2">{createdDate}</p>
                        <h1 className="text-secondary mb-3">{title}</h1>
                        <p className="me-description">{description}</p>
                    </div>
                </section>
                <section className="me-content-section">
                    <div className="container">
                        <div className={cn({ "has-image ": hasImage })}>
                            {image ?
                                <div className="text-center">
                                    <img className="img-fluid me-image" src={rootApi + image.url}/>
                                </div> :
                                null}
                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default connect(
    state => ({ post: uqSelector(WHERE, state)})
, {
    getPost: getPost
})(PostDetailPage);