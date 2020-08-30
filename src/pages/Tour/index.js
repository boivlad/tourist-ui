import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Col, Descriptions, Rate, Row, Typography,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { actions } from '../../state-management';
import api from '../../utils/api';
import { OrderModal } from '../../components/presentations';

const { Text, Title } = Typography;
const imageStyles = {
  height: '200px',
  minWidth: '200px',
};

class Tours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderModal: false,
    };
    this.openReserveModal = this.openReserveModal.bind(this);
    this.requestReserve = this.requestReserve.bind(this);
  }

  async componentDidMount() {
    await this.props.getTour(this.props.match.params.id);
  }

  openReserveModal() {
    this.setState({
      orderModal: true,
      selectedRoom: {
        id: this.props.tourData.id,
        maxPlaces: 100,
        defaultPrice: this.props.tourData.price,
      },
    });
  }

  requestReserve(data) {
    this.props.orderTour({ ...data, tourId: this.props.tourData.id });
  }

  render() {
    const item = this.props.tourData;
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
              <Col> <Text className="priceLabel" strong>${item.price}</Text></Col>
                <Col span={3}><Button disabled={!this.props.isLoggedIn} type="primary" shape="round" onClick={this.openReserveModal} icon={<ShoppingCartOutlined/>}
                                      size={'large'}>
                  To reserve
                </Button></Col>

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

export default connect(({ auth, tours }) => ({
  isLoggedIn: auth.isLoggedIn,
  tourData: tours.currentTour,
}), {
  getTour: actions.getTourById,
  orderTour: actions.orderTour,
})(Tours);
