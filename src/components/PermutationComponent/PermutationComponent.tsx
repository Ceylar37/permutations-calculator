import React from 'react';
import styles from "./PermutationComponent.module.css";
import {Input} from "antd";

interface PermutationComponentProps {
    name: React.ReactNode
    permutationValues: (number | '')[]
    onPermutationValueChange?: (value: number | '', index: number) => void,
    size: number
    readonly?: boolean
}

const PermutationComponent: React.FC<PermutationComponentProps> = React.memo((
    {permutationValues, onPermutationValueChange, size, name, readonly}
) => {
    return (
        <div className={styles.permutation} style={{gridTemplateColumns: `1fr repeat(${size}, 1fr)`}}>
            <div className={styles.name}>
                {name} =
            </div>
            {permutationValues.map((el, i) =>
                <div key={i}>
                    {i + 1}
                </div>
            )}
            {permutationValues.map((el, i) =>
                readonly
                    ? <div key={i}>
                        {permutationValues[i]}
                    </div>
                    : <Input
                        key={i}
                        style={{width: 40}}
                        value={permutationValues[i]}
                        onChange={(e) => onPermutationValueChange && onPermutationValueChange(
                            (e.currentTarget.value && !isNaN(+e.currentTarget.value)) ? +e.currentTarget.value : '',
                            i
                        )}
                    />
            )}
        </div>
    );
});

export default PermutationComponent;