import React, { Component } from 'react';

import styles from './PostDetailPage.module.scss';

export default class PostDetailPage extends Component {
    render() {
        return (
            <div className={styles.main}>
                <div className="container">
                    <section className="me-title-section">
                        <h3>Title</h3>
                        <p>20/11/2018</p>
                    </section>
                    <section className="me-content-section">
                        <div dangerouslySetInnerHTML={{__html: "Voluptas repudiandae voluptates reprehenderit inventore ratione laudantium et. Enim fugit adipisci aspernatur iusto sit ab error. Et enim voluptatibus impedit et beatae porro possimus quaerat. Quae culpa soluta ea. Neque sint eum. Ipsam impedit a hic vero omnis ut earum maxime aut. Consequuntur dolorem quas id. Fugit doloremque non et. Laboriosam ut accusantium. Molestiae ratione sit inventore dolor cupiditate. Et ut harum molestias nihil. Molestiae eum ipsa exercitationem est. Velit consectetur enim omnis quis iure. Fuga tempore eum fugiat officiis qui explicabo nisi soluta cum. Consectetur excepturi eveniet recusandae vitae natus et."}}/>
                    </section>
                </div>
            </div>
        )
    }
}