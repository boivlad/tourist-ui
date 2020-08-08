import React, { Component } from 'react';
import { List, Rate } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../../state-management';
import api from '../../utils/api';

class TransferList extends Component {
  async componentDidMount() {
    await this.props.getTransfers();
  }

  render() {
    const transfers = this.props.transferList;
    return (
      <div>
        {
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 4,
            }}
            dataSource={transfers}
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
                  title={<div className="serviceItemTitle">
                    <Link to={`/transfers/${item.id}`}>{item.title}</Link>
                    <span className="priceLabel">{`${item.price}грн.`}</span>
                    <Rate disabled defaultValue={item.rating}/>
                  </div>}
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

export default connect(({ auth, transfers }) => ({
  isLoggedIn: auth.isLoggedIn,
  transferList: transfers.transfers,
}), {
  getTransfers: actions.getTransfers,
})(TransferList);
