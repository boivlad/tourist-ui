import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Col, Descriptions, Rate, Row, Space, Table, Tag, Typography,
} from 'antd';
import { OrderModal } from '../../components';
import api from '../../utils/api';
import { actions } from '../../state-management';

const { Title } = Typography;
const imageStyles = {
  height: '200px',
  minWidth: '200px',
};
const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Places',
    dataIndex: 'places',
    key: 'places',
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
    key: 'rating',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (price) => (
      <span>
            <Tag color='green'>
              $ {price}
            </Tag>
      </span>
    ),
  },
];

class Hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderModal: false,
      selectedRoom: null,
    };
    this.openReserveModal = this.openReserveModal.bind(this);
    this.requestReserve = this.requestReserve.bind(this);
  }

  async componentDidMount() {
    await this.props.getHotel(this.props.match.params.id);
    await this.props.getRooms(this.props.match.params.id);
  }

  openReserveModal(roomId) {
    const room = this.props.hotelData.rooms.find((item) => (item.id === roomId));
    this.setState({
      orderModal: true,
      selectedRoom: {
        id: roomId,
        maxPlaces: room.places,
        defaultPrice: room.price,
      },
    });
  }

  requestReserve(data) {
    this.props.orderRoom({ ...data, roomId: this.state.selectedRoom.id });
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
            {item.rooms && (
              <Row>
                <Table
                  dataSource={item.rooms}
                  columns={[...columns, {
                    title: 'Action',
                    key: 'action',
                    dataIndex: 'id',
                    render: (id) => (
                      <Space size="middle">
                        <Button color='primary' disabled={!this.props.isLoggedIn} onClick={() => this.openReserveModal(id)}>Reserve</Button>
                      </Space>
                    ),
                  }]}
                /></Row>)}
          </>
        )}
        {this.state.orderModal && (
          <OrderModal
            item={this.state.selectedRoom}
            close={() => this.setState({ orderModal: false })}
            onFinish={this.requestReserve}/>

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
  getRooms: actions.getRoomsByHotel,
  orderRoom: actions.orderRoom,
})(Hotel);
