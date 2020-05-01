import React, { Component } from 'react';
import { api } from '../../../utils';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HotelsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: {},
    }
  }

  async componentDidMount() {
    const response = await api.getHotels();
    this.setState({ hotels: response });
  }

  render() {
    return (
      <div>
        {
          this.state.hotels[0] === undefined ?
            null :
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                pageSize: 4,
              }}
              dataSource={this.state.hotels}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  extra={
                    <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                >
                  <List.Item.Meta
                    title={<Link to={'/hotels/' + item.id}>{item.title}</Link>}
                    description={`${item.country}, ${item.city}, ${item.street}`}
                  />
                  {item.description}
                </List.Item>
              )}
            />
        }
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn })
)(HotelsList);

