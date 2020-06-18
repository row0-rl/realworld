import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Card } from "antd";
import AV from 'leancloud-storage';


import "./Home.css";
import Logo from "../../resources/realWorld.png"

const { Query } = AV;


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            news: []
        }
    }

    componentDidMount() {
        this.queryTopic();
    }

    queryTopic() {
        const that = this;
        const query = new Query("Topic");
        query.limit(6);
        query.descending("popularity");
        query.find().then(res => {
            console.log(res);
            
            const resLst = res.map(i => {
                return { ...i.attributes, id: i.id };
            })
            that.setState({ news: resLst })
        })
    }

    render() {
        const { news } = this.state;

        return <div className="home">
            {/* <span className="titleFont">real World</span> */}
            <img src={Logo} alt="realWorld" />
            <div className="cardWrap">
                {news.map(i => {
                    return <Link className="card" to={`/detail/${i.name}`}>
                        <Card
                            key={i.id}
                            hoverable
                            //className="card"
                            cover={<img alt="example" src={i.imgurl} />}
                        >
                            <div className="cardDescriptionFont">{i.name}</div>
                            <div className="cardDescriptionFont">{i.description}</div>
                        </Card>
                    </Link>
                })}
            </div>
            <div className="more">
                <Link to="/list">
                    More>
                </Link>
            </div>
        </div>
    }
}
export default Home;