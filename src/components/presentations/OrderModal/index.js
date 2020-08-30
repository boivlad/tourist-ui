import React from 'react';
import {
  Button, DatePicker, Form, InputNumber, Modal,
} from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
export default class OrderModal extends React.Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.calculateDays = this.calculateDays.bind(this);
    this.state = { days: 0, totalPrice: 0 };
  }

  componentDidMount() {
    this.setState({ totalPrice: this.props.item.defaultPrice });
  }

  calculateDays(e) {
    const days = e[1].diff(e[0], 'days');
    this.setState({ totalPrice: days * this.props.item.defaultPrice, days });
  }

  onFinish(fieldsValue) {
    const rangeValue = fieldsValue['range-picker'];
    const result = {
      startDate: rangeValue[0],
      endDate: rangeValue[1],
      places: fieldsValue.places,
    };
    this.props.onFinish(result);
  }

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Reserve"
          visible={true}
          footer={null}
          onCancel={this.props.close}
        >
          <Form
            {...layout}
            name="reserveForm"
            initialValues={{ places: 1 }}
            onFinish={this.onFinish}
          >
            <span>Selected {this.state.days} day(s)</span>
            <Form.Item name="range-picker" label="Select reserve range"
                       rules={[{ type: 'array', required: true, message: 'Please select time!' }]}>
              <DatePicker.RangePicker onChange={this.calculateDays}/>
            </Form.Item>
            <Form.Item name="places" label="Select places">
              <InputNumber min={1} max={this.props.item.maxPlaces} name="places"/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="secondary" style={{ margin: '0 8px' }}>
                Total Price:
              </Button>
            <Button style={{ margin: '0 8px', background: 'green', color: 'white' }}>
              ${this.state.totalPrice}
            </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>

              <Button htmlType="submit" type="primary">
                Reserve
              </Button>
              <Button htmlType="button" style={{ margin: '0 8px' }} onClick={this.props.close}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
