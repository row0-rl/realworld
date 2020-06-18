import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Card } from "antd";
import AV from 'leancloud-storage';


const { Query } = AV;

class News extends Component {

    constructor(props) {

        super(props);
        console.log(props);
        this.state = {
            news: [],
            id: props.id
        }
    }

    componentDidMount() {
        this.queryNews();
    }

    queryNews() {
        const that = this;
        const query = new Query("News");
        query.equalTo("topic", this.state.id);
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
        
        return (
            <div className="home">
                {/* <span className="titleFont">real World</span> */}
                <div className="cardWrap">
                    {news.map(i => {
                        return <Link className="card" to={`/article/${i.id}`}>
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
            </div>
        )
    }
}

export default News;