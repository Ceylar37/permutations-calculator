import React, {useLayoutEffect, useState} from 'react';
import {Button, Col, Row} from "antd";
import {PermutationComponent} from "../PermutationComponent";
import {messages, SizeProp} from "../../constants";
import {checkValidityOfPermutation, clearArr, createSetPermutation} from "../../utils";

const calculate = (firstPermutationValues: number[], secondPermutationValues: number[]) => {
    const answer: number[] = []
    for (let i = 0; i < secondPermutationValues.length; i++) {
        debugger
        answer.push(firstPermutationValues[secondPermutationValues[i] - 1])
    }
    return answer
}

const Multiple: React.FC<SizeProp> = React.memo(({size}) => {

    useLayoutEffect(() => {
        setFirstPermutationValues(clearArr(size))
        setSecondPermutationValues(clearArr(size))
        setAnswer(null)
    }, [size])

    const [firstPermutationValues, setFirstPermutationValues] = useState<(number | '')[]>(clearArr(size))
    const setFirstPermutation = createSetPermutation(setFirstPermutationValues)
    const [secondPermutationValues, setSecondPermutationValues] = useState<(number | '')[]>(clearArr(size))
    const setSecondPermutation = createSetPermutation(setSecondPermutationValues)
    const [answer, setAnswer] = useState<number[] | null>(null)

    const handleCalculateButtonClick = () => {

        const checkedFirstPermutationValues = checkValidityOfPermutation(firstPermutationValues, size, messages.aErr)
        const checkedSecondPermutationValues = checkValidityOfPermutation(secondPermutationValues, size, messages.bErr)

        if (checkedFirstPermutationValues && checkedSecondPermutationValues)
            setAnswer(calculate(checkedFirstPermutationValues, secondPermutationValues as number[]))
    }

    return (
        <Col>
            <Row justify='space-around' align='middle'>
                <Col>
                    <PermutationComponent
                        name={'a'}
                        size={size}
                        permutationValues={firstPermutationValues}
                        onPermutationValueChange={setFirstPermutation}
                    />
                </Col>
                <Col>
                    <PermutationComponent
                        name={'b'}
                        size={size}
                        permutationValues={secondPermutationValues}
                        onPermutationValueChange={setSecondPermutation}
                    />
                </Col>
            </Row>
            <Row justify='center'>
                <Button onClick={handleCalculateButtonClick}>
                    Рассчитать
                </Button>
            </Row>
            <Row justify='center' style={{
                fontSize: 22
            }}>
                {answer &&
                    <PermutationComponent
                        name={'a * b'}
                        permutationValues={answer}
                        size={size}
                        readonly={true}
                    />
                }
            </Row>
        </Col>
    );
});

export default Multiple;