import './Table.css';

const Table = ({ headerData, contentData }) => {
  return (
    <table className='table-main-div'>
      <thead>
        <tr className='table-row'>
          {headerData.map((item) => (
            <td key={item} style={{ fontWeight: 'bold' }}>
              {item}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {contentData.map((item) => (
          <tr className='table-row' key={item.tier}>
            <td>{item.tier}</td>
            <td>{item.points}</td>
            <td>{item.rewards}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
