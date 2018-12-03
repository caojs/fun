import React, { Component } from 'react';

import styles from './PostDetailPage.module.scss';

export default class PostDetailPage extends Component {
    render() {
        return (
            <div className={styles.main}>
                <section className="me-title-section">
                    <div className="container text-center">
                        <p className="text-muted me-date mb-2">20/11/2018</p>
                        <h1 className="text-secondary mb-3">Inventore laborum et nihil voluptatem.</h1>
                        <p className="me-description">Ipsa dolor ut minus ut sequi. Qui rerum ipsa. Recusandae non repudiandae aut odit sed non architecto et. Non sequi neque aut autem nisi rerum eum porro accusantium.</p>
                    </div>
                </section>
                <section className="me-content-section">
                    <div className="container">
                        <div dangerouslySetInnerHTML={{__html: "Voluptas repudiandae voluptates reprehenderit inventore ratione laudantium et. Enim fugit adipisci aspernatur iusto sit ab error. Et enim voluptatibus impedit et beatae porro possimus quaerat. Quae culpa soluta ea. Neque sint eum. Ipsam impedit a hic vero omnis ut earum maxime aut. Consequuntur dolorem quas id. Fugit doloremque non et. Laboriosam ut accusantium. Molestiae ratione sit inventore dolor cupiditate. Et ut harum molestias nihil. Molestiae eum ipsa exercitationem est. Velit consectetur enim omnis quis iure. Fuga tempore eum fugiat officiis qui explicabo nisi soluta cum. Consectetur excepturi eveniet recusandae vitae natus et."}}/>
                    </div>
                </section>
            </div>
        )
    }
}