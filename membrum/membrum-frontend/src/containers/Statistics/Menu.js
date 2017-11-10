import React from 'react'

const style = { display: 'inline', padding: '10px', userSelect: 'none' }
const selectedStyle = Object.assign({}, { background: 'rebeccapurple' }, style)
const styleCheck = (item, selected) =>
  item === selected ? selectedStyle : style

export default ({ filters, click, selected }) => (
  <ul>
    {filters.map((item, i) => (
      <li key={i} id={item} style={styleCheck(item, selected)} onClick={click}>
        {item}
      </li>
    ))}
  </ul>
)
