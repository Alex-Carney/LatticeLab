import React, { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const handleStyle = { left: 10 };

function Cavity({ id, data, isConnectable }) {
    const handleChange = useCallback((evt) => {
        const { name, value } = evt.target;
        console.log(`${name}: ${value}`);
    }, []);

    return (
        <div className="custom-node">
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div>
                <label htmlFor={`name-${id}`}>Name:</label>
                <input id={`name-${id}`} name="name" onChange={handleChange} className="nodrag" />
            </div>
            <div>
                <label htmlFor={`resonantFrequency-${id}`}>Resonant Frequency:</label>
                <input
                    id={`resonantFrequency-${id}`}
                    name="resonantFrequency"
                    type="number"
                    onChange={handleChange}
                    className="nodrag"
                />
            </div>
            <div>
                <label htmlFor={`dissipation-${id}`}>Dissipation:</label>
                <input
                    id={`dissipation-${id}`}
                    name="dissipation"
                    type="number"
                    onChange={handleChange}
                    className="nodrag"
                />
            </div>
            <div>
                <label htmlFor={`drive-${id}`}>Drive:</label>
                <input
                    id={`drive-${id}`}
                    name="drive"
                    type="number"
                    onChange={handleChange}
                    className="nodrag"
                />
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={handleStyle}
                isConnectable={isConnectable}
            />
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}

export default Cavity;
