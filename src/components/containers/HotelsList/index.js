import React, { Component } from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../../../state-management';
import api from '../../../utils/api';

class HotelsList extends Component {
  async componentDidMount() {
    await this.props.getHotels();
  }

  render() {
    const hotels = this.props.hotelList;
    return (
      <div>
        {
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 4,
            }}
            dataSource={hotels}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                extra={
                  <img
                    width={272}
                    height={168}
                    alt="logo"
                    src={`${api.hostPath}uploads/images/${item.preview}`}
                  />
                }
              >
                <List.Item.Meta
                  title={<Link to={`/hotels/${item.id}`}>{item.title}</Link>}
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

export default connect(({ auth, hotels }) => ({
  isLoggedIn: auth.isLoggedIn,
  hotelList: hotels.hotels,
}), {
  getHotels: actions.getHotels,
})(HotelsList);
