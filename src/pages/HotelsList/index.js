import React, { Component } from 'react';
import { List, Rate } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../../state-management';
import api from '../../utils/api';

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
                    className='serviceItemPreview'
                    width={272}
                    height={168}
                    alt={`Preview-${item.title}`}
                    src={`${api.hostPath}uploads/images/${item.preview}`}
                  />
                }
              >
                <List.Item.Meta
                  title={<div className="serviceItemTitle"><Link to={`/hotels/${item.id}`}><span>{item.title}</span></Link><Rate disabled defaultValue={item.rating} /></div>}
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
