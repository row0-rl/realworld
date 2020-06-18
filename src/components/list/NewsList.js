/*import React, { Component } from "react";
import { List, Card } from 'antd';
import AV from 'leancloud-storage';

const { Query } = AV;

class NewsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            news: [
                {
                    name: "Coronavirus",
                    description: "Description"
                },
                {
                    name: "Coronavirus",
                    description: "Description"
                },
                {
                    name: "Coronavirus",
                    description: "Description"
                },
                {
                    name: "Coronavirus",
                    description: "Description"
                },
                {
                    name: "Coronavirus",
                    description: "Description"
                },
                {
                    name: "Coronavirus",
                    description: "Description"
                }
            ]
        }
    }

    componentDidMount() {
        this.queryTopic();
    }

    queryTopic() {
        const that = this;
        const query = new Query("Topic");
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

        return <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={news}
            renderItem={item => (
                <List.Item>
                    <Card
                        hoverable
                        className="card"
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <div className="cardDescriptionFont">{item.name}</div>
                        <div className="cardDescriptionFont">{item.description}</div>
                    </Card>
                </List.Item>
            )}
        />;
    }

}

export default NewsList;*/

import React, { Component } from "react";
import { List, Avatar, Button, Skeleton } from 'antd';
import AV from 'leancloud-storage';

const { Query } = AV;

const count = 3;

class NewsList extends Component {

    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
    };

    componentDidMount() {
        this.getData(res => {
            this.setState({
                initLoading: false,
                data: res.results,
                list: res.results,
            });
        });
    }

    getData = callBack => {
        const that = this;
        const query = new Query("Topic");
        query.descending("popularity");
        query.find().then(res => {
            console.log(res);
            
            const resLst = res.map(i => {
                return { ...i.attributes, id: i.id };
            })
            callBack({ results: resLst });
        })
    }

    onLoadMore = () => {
        this.setState({
            loading: true,
            list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
        });
        this.getData(res => {
            const data = this.state.data.concat(res.results);
            this.setState(
                {
                    data,
                    list: data,
                    loading: false,
                },
                () => {
                    // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                    // In real scene, you can using public method of react-virtualized:
                    // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                    window.dispatchEvent(new Event('resize'));
                },
            );
        });
    };

    render() {
        const { initLoading, loading, list } = this.state;
        const loadMore =
            !initLoading && !loading ? (
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: 12,
                        height: 32,
                        lineHeight: '32px',
                    }}
                >
                    <Button onClick={this.onLoadMore}>loading more</Button>
                </div>
            ) : null;

        return (
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={item => (
                    <List.Item
                        actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                }
                                title={<a href="https://ant.design">{item.name}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                            <div>content</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
        );
    }
}

export default NewsList;