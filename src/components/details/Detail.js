import React, { Component } from "react";
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import News from "./News.js";

const { SubMenu } = Menu;

class Detail extends Component {

    constructor(props) {
        super(props)

        this.state = {
                current: 'news',
                id: props.match.params.id,
                news: [],
                socialMedia: [],
                data: []
            };

    }    

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    switchPage() {
        switch(this.state.current) {
            case 'news': return <News id={this.state.id}/>;
            case 'socialMedia': return <div>Social Media</div>;
            case 'data': return <div>Data</div>;
        }
    }

    render() {
        const that = this;
        return (
            <div>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="news" icon={<MailOutlined />}>
                        News
                    </Menu.Item>

                    <Menu.Item key="socialMedia" icon={<AppstoreOutlined />}>
                        Social Media
                    </Menu.Item>

                    <Menu.Item key="data">
                        Data
                    </Menu.Item>
                </Menu>
                
                {that.switchPage()}

            </div>
        );
    }
}

export default Detail;