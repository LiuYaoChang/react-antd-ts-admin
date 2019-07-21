import React from 'react';
import { Row, Col } from 'antd';
import Basic from './components/Basic';
import InnerLabel from './components/InnerLabel';
import Fan from './components/Fan';


class PieChart extends React.Component {

  public render() {
    return (
      <div className="chart">
        <Row gutter={16}>
          <Col lg={12} sm={24}>
            <h3>基础饼状图</h3>
            <Basic />
          </Col>
          <Col lg={12} sm={24}>
            <h3>内部的label</h3>
            <InnerLabel />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col lg={12} sm={24}>
            <h3>扇形图</h3>
            <Fan />
          </Col>
          {/* <Col lg={12} sm={24}>

          </Col> */}
        </Row>
      </div>
    )
  }
}

export default PieChart;
