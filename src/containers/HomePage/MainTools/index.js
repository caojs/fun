import React, { Component } from 'react';
import { FaChartPie, FaFilter, FaCrosshairs } from 'react-icons/fa';
import cn from 'classnames';

import Tool from './Tool';

import styles from './MainTools.module.scss';

export default class MainTools extends Component {
    render() {
        return (
            <section className={cn(styles.main, "container")}>
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <Tool
                            icon={<FaFilter/>}
                            title="Filter"
                            text="Est expedita provident ipsam voluptas et. Quas dolores porro consectetur ut molestiae sed blanditiis impedit veniam. Dolorem delectus voluptas impedit odit sequi id fugit saepe est. Quibusdam enim quia possimus et voluptas ipsa harum autem ex."
                            link="/filter"/>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <Tool
                            icon={<FaCrosshairs/>}
                            title="Optimization"
                            text="Sed voluptatibus quia omnis quis perferendis asperiores illo et. Debitis sunt et animi. Ab aut ut dolor. Aperiam unde molestiae est fuga impedit ipsum exercitationem laboriosam mollitia. Voluptatem exercitationem laudantium ipsa qui excepturi totam aspernatur amet tenetur."
                            link="/optimize"/>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <Tool
                            icon={<FaChartPie/>}
                            title="Backtest"
                            text="Voluptatem nam fugit excepturi ut soluta. Ipsum rem autem iusto dolor ipsa placeat eos necessitatibus. Illo voluptatem corrupti vero. Et distinctio vel pariatur et et sunt."
                            link="/backtest"/>
                    </div>
                </div>
            </section>
        )
    }
}