import './Table.css';

const Table = ({ data }) => {
  return (
    <div className='table-container'>
      <table className='table-main-div'>
        <thead>
          <tr className='tabled1'>
            <th>Tier</th>
            <th>Points</th>
            <th>Reward</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr className='tabled1' key={item.tier}>
              <td>{item.tier}</td>
              <td>{item.points}</td>
              <td>{item.rewards}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
