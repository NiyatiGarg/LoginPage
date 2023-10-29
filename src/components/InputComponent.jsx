import styled from 'styled-components';

const Input = styled.input`
    padding: 10px;
    margin: 10px 0;
    width: 95%;
`

const Checkbox = styled.input`
    margin: 10px 0;
    width: auto;
`

const InputComponent = (props) => {
    return props.type === 'checkbox'
        ? <Checkbox {...props} />
        : <Input {...props} />;
}

export default InputComponent;