import React, {useState} from 'react';
import './styles.css'
import {Col, Layout, Row, Select} from "antd";
import 'antd/dist/antd.css'
import {Multiple} from "./components/Multiple";
import {Order} from "./components/Order";
import {Power} from "./components/Power";
import {Reversed} from "./components/Reversed";

type Operation = 'multiple' | 'order' | 'power' | 'reversed'
const nums: number[] = (new Array(7)
        .fill(0)
        .map((el, i) => i + 4)
)

const App = () => {

    const [curOperation, setCurOperation] = useState<Operation>('multiple')
    const [size, setSize] = useState(4)

    return (
        <Layout
            style={{height: '100vh'}}
        >
            <Layout.Header>
                <Row justify='space-around' align='middle'>
                    <Col>
                        <Select
                            style={{
                                width: 200
                            }}
                            value={curOperation}
                            onChange={(e) => setCurOperation(e)}
                        >
                            <Select.Option
                                value='multiple'
                            >
                                Умножение
                            </Select.Option>
                            <Select.Option
                                value='order'
                            >
                                Порядок
                            </Select.Option>
                            <Select.Option
                                value='power'
                            >
                                Возведение в степень
                            </Select.Option>
                            <Select.Option
                                value='reversed'
                            >
                                Обратная
                            </Select.Option>
                        </Select>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h3
                                    style={{color: 'white'}}
                                >Размер</h3>
                            </Col>
                            <Col>
                                <Select
                                    value={size}
                                    onChange={(n) => setSize(n)}
                                >
                                    {nums.map(n =>
                                        <Select.Option value={n} key={n}>
                                            {n}
                                        </Select.Option>
                                    )}
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Layout.Header>
            <Layout.Content
                style={{flex: '1', padding: 10}}
            >
                {curOperation === 'multiple' && <Multiple size={size}/>}
                {curOperation === 'order' && <Order size={size}/>}
                {curOperation === 'power' && <Power size={size}/>}
                {curOperation === 'reversed' && <Reversed size={size}/>}
            </Layout.Content>
        </Layout>
    )
};

export default App;
