import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Col, Descriptions, Rate, Row, Typography,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import api from '../../utils/api';
import { actions } from '../../state-management';

const { Text, Title } = Typography;
const imageStyles = {
  height: '200px',
  minWidth: '200px',
};
class Hotel extends Component {
  async componentDidMount() {
    await this.props.getHotel(this.props.match.params.id);
  }

  render() {
    const item = this.props.hotelData;
    return (
      <div>
        {item && (
          <>
            <Row>
              <Col>
                <Title>{item.title} </Title>
              </Col>
              <Col offset="1"><Rate disabled defaultValue={item.rating}/></Col>
            </Row>
            <Row gutter={[24, 24]}>
              {this.props.isLoggedIn && (
                <Col span={3}><Button type="primary" shape="round" icon={<ShoppingCartOutlined/>}
                                      size={'large'}>
                  To order
                </Button></Col>)}

            </Row>
            <Row gutter={[24, 24]}>
              <Col><img
                style={imageStyles}
                alt={`Preview-${item.title}`}
                title={`Preview-${item.title}`}
                src={`${api.hostPath}uploads/images/${item.preview}`}
              /></Col>
              <Col>
                <Descriptions title="Transfer Info" bordered layout='vertical'>
                  <Descriptions.Item label="Country">{item.country}</Descriptions.Item>
                  <Descriptions.Item label="City">{item.city}</Descriptions.Item>
                  <Descriptions.Item label="Street">{item.street}</Descriptions.Item>
                </Descriptions>
              </Col>

            </Row>
            <Row gutter={[24, 24]}>
              <Col>
                <Title level={4}>Description</Title>
                <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                  {item.description}
                </Typography.Paragraph>
              </Col>
            </Row>

          </>
        )}
      </div>
    );
  }
}

export default connect(({ auth, hotels }) => ({
  isLoggedIn: auth.isLoggedIn,
  hotelData: hotels.currentHotel,
}), {
  getHotel: actions.getHotelById,
})(Hotel);
