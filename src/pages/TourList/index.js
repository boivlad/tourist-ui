import React, { Component } from 'react';
import { List, Rate } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../../state-management';
import api from '../../utils/api';

class TourList extends Component {
  async componentDidMount() {
    await this.props.getTours();
  }

  render() {
    const tours = this.props.tourList;
    return (
      <div>
        {
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 4,
            }}
            dataSource={tours}
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
                  title={<div className="serviceItemTitle"><Link to={`/tours/${item.id}`}>{item.title}</Link><span className="priceLabel">{`${item.price}грн.`}</span> <Rate disabled defaultValue={item.rating}/></div>}
                  description={`${item.country}, ${item.city}`}
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

export default connect(({ auth, tours }) => ({
  isLoggedIn: auth.isLoggedIn,
  tourList: tours.tours,
}), {
  getTours: actions.getTours,
})(TourList);
