import React, { Component } from "react";
import { Link } from 'react-router-dom';
import AV from 'leancloud-storage';
import { Comment, List, Tooltip } from 'antd';
import moment from 'moment';


const { Query } = AV;

class SocialMedia extends Component {

    constructor(props) {

        super(props);
        console.log(props);
        this.state = {
            news: [],
            id: props.id
        }
    }

    // componentDidMount() {
    //     this.queryNews();
    // }

    // queryNews() {
    //     const that = this;
    //     const query = new Query("SocialMedia");
    //     query.equalTo("topic", this.state.id);
    //     query.find().then(res => {
    //         console.log(res);

    //         const resLst = res.map(i => {
    //             return { ...i.attributes, id: i.id };
    //         })
    //         that.setState({ news: resLst })
    //     })
    // }

    render() {

        const { news } = this.state;

        const data = [
            {
              actions: [<span key="comment-list-reply-to-0">Reply to</span>],
              author: 'Han Solo',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns and high quality design
                  resources (Sketch and Axure), to help people create their product prototypes beautifully and
                  efficiently.
                </p>
              ),
              datetime: (
                <Tooltip
                  title={moment()
                    .subtract(1, 'days')
                    .format('YYYY-MM-DD HH:mm:ss')}
                >
                  <span>
                    {moment()
                      .subtract(1, 'days')
                      .fromNow()}
                  </span>
                </Tooltip>
              ),
            },
            {
              actions: [<span key="comment-list-reply-to-0">Reply to</span>],
              author: 'Han Solo',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: (
                <p>
                  We supply a series of design principles, practical patterns and high quality design
                  resources (Sketch and Axure), to help people create their product prototypes beautifully and
                  efficiently.
                </p>
              ),
              datetime: (
                <Tooltip
                  title={moment()
                    .subtract(2, 'days')
                    .format('YYYY-MM-DD HH:mm:ss')}
                >
                  <span>
                    {moment()
                      .subtract(2, 'days')
                      .fromNow()}
                  </span>
                </Tooltip>
              ),
            },
          ];

        return (
            <div className="home">
                <List
                    className="comment-list"
                    header={`${data.length} replies`}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <li>
                            <Comment
                                actions={item.actions}
                                author={item.author}
                                avatar={item.avatar}
                                content={item.content}
                                datetime={item.datetime}
                            />
                        </li>
                    )}
                />,
            </div>
        )
    }
}

export default SocialMedia;